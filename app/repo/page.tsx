/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import RepoViewLayout from '@/components/repo/RepoViewLayout';
import Footer from '@/components/ui/Footer';
import SpinnerText from '@/components/ui/SpinnerText';
import { SERVER_URL } from '@/config/constants';
import shared from '@/shared/constants';
import Repo from '@/types/repoTypes';
import { isSingleCacheExpired } from '@/util/cache';
import axios, { AxiosError } from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { ArrowLeft02Icon } from 'hugeicons-react';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

/**
 * Responsible for fetching and caching individual repo contents.
 * Contains options to upload, bookmark, share and delete the repo
 * if the user wishes. This component mostly handles the data logic,
 * the UI is kept separately.
 * @returns a repo page component
 */
export default function Page() {
    // Page state
    const searchParams = useSearchParams();
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [repo, setRepo] = useState<Repo | null>(null);

    // URL query parameters
    const repoID = searchParams.get('repo');
    const userID = searchParams.get('user');

    /**
     * Attempts to retrieve a previously cached repository.
     * Repositories are cached using the signature: `repo-{id}`.
     * @returns a repo record or null.
     */
    const loadRepoFromLocalStorage = useCallback(() => {
        const identifier = `_cr-${repoID}`;
        if (localStorage.getItem(identifier)) {
            return JSON.parse(localStorage.getItem(identifier)!);
        }
        return null;
    }, [repoID]);

    /**
     * Attempts to fetch this repositories content. Firstly check if this
     * repo is cached and use that instead to save compute and network IO.
     * On cache miss, fetch the required repo content from the server, cache
     * the result and force a full refresh.
     * @info **async**
     */
    const fetchRepoContent = useCallback(async () => {
        setErrorMsg('');
        const localRepo = loadRepoFromLocalStorage();

        if (
            localRepo &&
            !isSingleCacheExpired(repoID as string) &&
            localStorage.getItem(shared.keys.FORCE_UPDATE) != 'true'
        ) {
            setRepo(localRepo);
            setLoading(false);
            return;
        }

        // Guard check if user accesses this page without required credentials
        if (!userID || !repoID) {
            setErrorMsg('Bad state, URL is malformed.');
            setLoading(false);
            return;
        }

        try {
            const refreshToken = getCookie(shared.keys.REFRESH_TOKEN);
            let accessToken = getCookie(shared.keys.ACCESS_TOKEN);

            if (!accessToken) {
                const { data: tokenData } = await axios.get(
                    `${SERVER_URL}/auth/refreshToken/${userID}`,
                    {
                        headers: { Authorization: `Bearer ${refreshToken}` },
                    }
                );

                accessToken = tokenData.payload['access_token'];
                setCookie(shared.keys.ACCESS_TOKEN, accessToken, {
                    maxAge: 20 * 60,
                    sameSite: 'strict',
                }); // 20 mins
            }

            const { data: repoData } = await axios.get(
                `${SERVER_URL}/users/${userID}/repo/${repoID}`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            const thisRepo = repoData['payload'];
            localStorage.setItem(`_cr-${repoID}`, JSON.stringify(thisRepo));
            localStorage.setItem(
                `${shared.keys.SINGLE_REPO_CACHE_TIME}-${repoID}`,
                JSON.stringify(Date.now())
            );
            localStorage.setItem(shared.keys.FORCE_UPDATE, 'false');
            // DEBUG: console.log(thisRepo);
            setRepo(thisRepo);
        } catch (err) {
            console.error('Failed to get repo content:', err);
            if ((err as AxiosError).response?.status == 404) {
                setErrorMsg('This repository does not exist.');
                return;
            }
            setErrorMsg('Oops, something went wrong, check your connection.');
        } finally {
            setLoading(false);
        }
    }, [userID, repoID, loadRepoFromLocalStorage]);

    useEffect(() => {
        fetchRepoContent();
    }, [fetchRepoContent]);

    return (
        <ProtectedRoute>
            <section className="flex flex-col h-screen">
                <section className="mt-8 w-full max-w-3xl mx-auto flex-grow">
                    <header className="cursor-pointer dark:text-neutral-300 text-neutral-500 dark:hover:text-neutral-200 transition-colors">
                        <a
                            href="/"
                            className="flex gap-2 items-center px-4 md:px-0"
                        >
                            <ArrowLeft02Icon />
                            <span>Back</span>
                        </a>
                    </header>
                    {loading ? (
                        <div className="flex md:justify-center items-start">
                            <SpinnerText text="Just a moment..." />
                        </div>
                    ) : errorMsg ? (
                        <section className="w-full grid place-items-center mt-8">
                            <h3 className="text-neutral-300 text-xl">
                                {errorMsg}
                            </h3>
                        </section>
                    ) : (
                        repo && (
                            <main className="mt-8">
                                <div className="text-left px-4 md:px-0 md:text-center">
                                    <h2 className="font-bold text-3xl">
                                        {repo.name}
                                    </h2>
                                    <p className="text-base mt-4 text-neutral-500 dark:text-neutral-300">
                                        {repo.description}
                                    </p>
                                </div>
                                <RepoViewLayout
                                    repoID={repo.id}
                                    isPublic={repo.isPublic}
                                    files={repo.files}
                                />
                            </main>
                        )
                    )}
                </section>
                <Footer />
            </section>
        </ProtectedRoute>
    );
}
