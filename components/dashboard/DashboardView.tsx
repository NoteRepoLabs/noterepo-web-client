/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import { SERVER_URL } from '@/config/constants';
import { UserInterface } from '@/types/userTypes';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { SearchNormal1 } from 'iconsax-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CreateRepoDialog from '../repo/CreateRepoDialog';
import RepoGridItem from '../repo/RepoGridItem';
import InputField from '../ui/InputField';
import IconButton from './IconButton';
import Repo from '@/types/repoTypes';
import DeleteRepoDialog from '../repo/DeleteRepoDialog';
import SpinnerText from '../ui/SpinnerText';
import { isCacheExpired, saveReposToCache } from '@/util/cache';
import RepoListItem from '../repo/RepoListItem';

export interface DashboardProps {
    user: UserInterface;
}

type ViewType = 'LIST' | 'GRID';

/**
 * Main dashboard view component, responsible for fetching, caching
 * and displaying the user's list of repositories.
 * This is where most repo management actions (creating / deleting) is done.
 * @param props passed in to modify dashboard behaviour
 * @returns a dashboard view component
 */
export default function DashboardView(props: DashboardProps) {
    // Page state
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [repoView, setRepoView] = useState<ViewType>('LIST');
    const [selectedRepoID, setSelectedRepoID] = useState('');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [repos, setRepos] = useState<Repo[]>([]);

    // Sort by date & filter by name or description
    const filteredRepos = repos.filter(
        (repo) =>
            repo.name.toLowerCase().includes(search.toLowerCase()) ||
            repo.description.toLowerCase().includes(search.toLowerCase())
    );

    /**
     * Requests a collection of repositories owned by the logged in user.
     * Firstly we get the user's ID and refresh token and request for an access token.
     * Then use the access token to request for the repo collection, the request is cached
     * to improve performance.
     * @param accessToken Users access token for elevated privileges
     */
    const fetchRepos = async (accessToken: string) => {
        try {
            const userID = JSON.parse(localStorage.getItem('user')!)['id'];
            const response = await axios.get(
                `${SERVER_URL}/users/${userID}/repo`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const fetchedRepos = response.data['payload'];
            const cachedRepos = JSON.parse(
                localStorage.getItem('repos') || '[]'
            );

            // Check if repos have changed
            if (JSON.stringify(fetchedRepos) != JSON.stringify(cachedRepos)) {
                setRepos(
                    fetchedRepos.sort(
                        (a: Repo, b: Repo) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                );
                saveReposToCache(fetchedRepos);
            } else {
                setRepos(cachedRepos);
            }

            if (isCacheExpired()) {
                saveReposToCache(fetchedRepos);
            }

            // DEBUG: console.log(fetchedRepos);
        } catch (error) {
            console.error('Failed to fetch repositories:', error);
            setErrorMsg('Cannot fetch repos at this time.');
        }
    };

    /**
     * Handles when a repo has successfully been modified.
     * We make a request to fetch the current repository state and optionally
     * cache the result.
     * @param accessToken Users access token for elevated privileges
     */
    const handleRepoModificationSuccess = (accessToken: string) => {
        fetchRepos(accessToken).then(() => {
            setShowCreateDialog(false);
            setShowDeleteDialog(false);
        });
    };

    /**
     * While the cache is still valid and have repos saved to local storage,
     * use the locally stored data, otherwise, make a fresh request
     * to the server and cache the result.
     */
    const onLoad = async () => {
        if (!isCacheExpired() && localStorage.getItem('repos')) {
            const cachedRepos = JSON.parse(localStorage.getItem('repos')!);
            console.log('Fallback on cache.');
            setRepos(cachedRepos);
            setLoading(false);
            return;
        }

        try {
            const userID = JSON.parse(localStorage.getItem('user')!)['id'];
            const refreshToken = getCookie('refreshToken');

            const { data: tokenData } = await axios.get(
                `${SERVER_URL}/auth/refreshToken/${userID}`,
                {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                }
            );

            const accessToken = tokenData.payload['access_token'];

            const { data: repoData } = await axios.get(
                `${SERVER_URL}/users/${userID}/repo`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            // Sort and save new data to cache
            const sortedFetchedRepos = repoData['payload'].sort(
                (a: Repo, b: Repo) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            );

            setRepos(sortedFetchedRepos);
            saveReposToCache(sortedFetchedRepos);
        } catch (err) {
            console.error('Failed to fetch repos', err);
            setErrorMsg('Failed to fetch repos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <>
            {/* CREATE REPO DIALOG */}
            {showCreateDialog && (
                <CreateRepoDialog
                    onClick={() => setShowCreateDialog(false)}
                    onSuccess={handleRepoModificationSuccess}
                />
            )}
            {/* DELETE REPO DIALOG */}
            {showDeleteDialog && (
                <DeleteRepoDialog
                    repoID={selectedRepoID}
                    onCloseClick={() => setShowDeleteDialog(false)}
                    onSuccess={handleRepoModificationSuccess}
                />
            )}
            <section className="w-full mt-[72px] py-8 h-full flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-center w-full max-w-[1200px] px-2 gap-4 sm:gap-2">
                    <div className="flex-grow w-full max-w-lg">
                        {/* SEARCH BAR */}
                        <InputField
                            name={'search'}
                            type={'text'}
                            id={'search-field'}
                            value={search}
                            placeholder={'Find something quickly'}
                            required={false}
                            iconPos="left"
                            noMargin={true}
                            icon={
                                <SearchNormal1
                                    size="24"
                                    color="#A1A7B5"
                                    variant="TwoTone"
                                    className="absolute left-[16px] top-[50%] transform -translate-y-1/2 cursor-pointer"
                                />
                            }
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setSearch(e.target.value);
                            }}
                            style={{
                                paddingRight: '16px',
                                paddingLeft: '48px',
                                width: '100%',
                                marginBottom: '0px',
                            }}
                        />
                    </div>

                    {/* NEW REPO BUTTON */}
                    <IconButton
                        text="New Repo"
                        style={{ padding: '14px 8px' }}
                        onClick={() => setShowCreateDialog(true)}
                    />
                </div>

                <h2 className="font-bold text-3xl text-left sm:text-center mt-8 mx-2 sm:mx-0 cursor-default">
                    Your Repositories
                </h2>

                {loading && <SpinnerText text="Hang on, getting your repos." />}

                {errorMsg && (
                    <h2 className="w-full text-center mt-8  text-neutral-300 text-xl">
                        {errorMsg}
                    </h2>
                )}

                {!loading && !errorMsg && repos.length === 0 && (
                    <div className="flex flex-col justify-center mt-8">
                        <div className="flex justify-center ml-8">
                            <Image
                                src={'/img/EmptyClip.svg'}
                                alt={'empty'}
                                width={160}
                                height={200}
                                priority={true}
                            />
                        </div>
                        <h4 className="font-medium text-2xl mt-8 text-neutral-300 text-center">
                            Nothing Here Yet.
                        </h4>
                    </div>
                )}

                <section className="px-2 sm:px-8 my-8 w-full">
                    {!loading &&
                    !errorMsg &&
                    repos.length != 0 &&
                    filteredRepos.length != 0 ? (
                        repoView == 'GRID' ? (
                            <section className="w-full grid gap-4 grid-cols-1 justify-items-center sm:grid-cols-3">
                                {filteredRepos.map((repo, id) => (
                                    <RepoGridItem
                                        key={id}
                                        repo={repo}
                                        onClick={() => {
                                            window.location.href = `/repo?user=${props.user.id}&repo=${repo.id}`;
                                        }}
                                        onDeleteClick={() => {
                                            setSelectedRepoID(repo.id);
                                            setShowDeleteDialog(true);
                                        }}
                                    />
                                ))}
                            </section>
                        ) : (
                            <section className="w-full flex flex-col gap-2">
                                {filteredRepos.map((repo, id) => (
                                    <RepoListItem
                                        key={id}
                                        userID={props.user.id}
                                        repoID={repo.id}
                                        repo={repo}
                                    />
                                ))}
                            </section>
                        )
                    ) : (
                        !loading && (
                            <h3 className="text-center mt-8 text-neutral-500">
                                No Repos match this filter.
                            </h3>
                        )
                    )}
                </section>
            </section>
        </>
    );
}
