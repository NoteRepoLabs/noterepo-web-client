'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import RepoViewLayout from '@/components/repo/RepoViewLayout';
import SpinnerText from '@/components/ui/SpinnerText';
import { SERVER_URL } from '@/config/constants';
import Repo from '@/types/repoTypes';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { ArrowLeft02Icon } from 'hugeicons-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [repo, setRepo] = useState<Repo | null>(null);

    const repoID = searchParams.get('repo');
    const userID = searchParams.get('user');

    const loadRepoFromLocalStorage = useCallback(() => {
        const identifier = `repo-${repoID}`;
        if (localStorage.getItem(identifier)) {
            return JSON.parse(localStorage.getItem(identifier)!);
        }
        return null;
    }, [repoID]);

    const fetchRepoContent = useCallback(async () => {
        setErrorMsg('');
        const localRepo = loadRepoFromLocalStorage();
        if (localRepo && localStorage.getItem('forceUpdate') != 'true') {
            setRepo(localRepo);
            setLoading(false);
            return;
        }

        if (!userID || !repoID) {
            setErrorMsg('Bad state, URL is malformed.');
            setLoading(false);
            return;
        }

        try {
            const refreshToken = getCookie('refreshToken');
            const { data: tokenData } = await axios.get(
                `${SERVER_URL}/auth/refreshToken/${userID}`,
                {
                    headers: { Authorization: `Bearer ${refreshToken}` },
                }
            );
            const accessToken = tokenData.payload['access_token'];

            const { data: repoData } = await axios.get(
                `${SERVER_URL}/users/${userID}/repo/${repoID}`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            const thisRepo = repoData['payload'];
            localStorage.setItem(`repo-${repoID}`, JSON.stringify(thisRepo));
            localStorage.setItem('forceUpdate', 'false');
            // DEBUG: console.log(thisRepo);
            setRepo(thisRepo);
        } catch (error) {
            console.error('Failed to get repo content:', error);
            setErrorMsg('Failed to get repo content. Check your connection.');
        } finally {
            setLoading(false);
        }
    }, [userID, repoID, loadRepoFromLocalStorage]);

    useEffect(() => {
        fetchRepoContent();
    }, [fetchRepoContent]);

    return (
        <ProtectedRoute>
            <section className="mt-8 w-full max-w-3xl min-h-[90%] mx-auto">
                <header className="cursor-pointer text-neutral-300 hover:text-neutral-200 transition-colors">
                    <a href="/" className="flex gap-2 items-center px-4 sm:px-0">
                        <ArrowLeft02Icon />
                        <span>Back</span>
                    </a>
                </header>
                {loading ? (
                    <section className="w-full grid place-items-center">
                        <SpinnerText text="Getting files." />
                    </section>
                ) : errorMsg ? (
                    <section className="w-full grid place-items-center mt-8">
                        <h3 className="text-neutral-300 text-xl">{errorMsg}</h3>
                    </section>
                ) : (
                    repo && (
                        <main className="mt-8">
                            <div className="text-left px-4 sm:px-0 sm:text-center">
                                <h2 className="font-bold text-3xl">
                                    {repo.name}
                                </h2>
                                <p className="text-base mt-4 text-neutral-300">
                                    {repo.description}
                                </p>
                            </div>
                            <RepoViewLayout files={repo.files} />
                        </main>
                    )
                )}
            </section>
        </ProtectedRoute>
    );
}
