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
import { getCookie, setCookie } from 'cookies-next';
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
import shared from '@/shared/constants';
import DashboardSettings from './DashboardSettings';
import fetchRepos from '@/queries/fetchRepos';
import Footer from '../ui/Footer';

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
    const [privateOnly, setPrivateOnly] = useState(false);
    const [savedOnly, setSavedOnly] = useState(false);

    // Toggle between list and grid views
    const toggleListView = () => setRepoView('LIST');
    const toggleGridView = () => setRepoView('GRID');

    // Sort by date & filter by name or description
    let filteredRepos = repos.filter((repo) => {
        const defaultFilter =
            repo.name.toLowerCase().includes(search.toLowerCase()) ||
            repo.description.toLowerCase().includes(search.toLowerCase());

        if (privateOnly) {
            return defaultFilter && !repo.isPublic;
        }

        return defaultFilter;
    });

    /**
     * Handles when a repo has successfully been modified.
     * We make a request to fetch the current repository state and optionally
     * cache the result.
     * @param accessToken Users access token for elevated privileges
     */
    const handleRepoModificationSuccess = (accessToken: string) => {
        fetchRepos(
            accessToken,
            (data) => {
                setRepos(data);
                setShowCreateDialog(false);
                setShowDeleteDialog(false);
            },
            (data) => saveReposToCache(data),
            (err) => {
                console.error('Failed to fetch repositories:', err);
                setErrorMsg('Cannot fetch repos at this time.');
            }
        );
    };

    /**
     * While the cache is still valid and have repos saved to local storage,
     * use the locally stored data, otherwise, make a fresh request
     * to the server and cache the result.
     */
    const onLoad = async () => {
        if (!isCacheExpired() && localStorage.getItem(shared.keys.REPOS)) {
            console.log('[INFO]: Cache hit.');
            const cachedRepos = JSON.parse(
                localStorage.getItem(shared.keys.REPOS)!
            );
            setRepos(cachedRepos);
            setLoading(false);
        } else {
            console.log('[INFO]: Cache miss.');
            try {
                const userID = JSON.parse(
                    localStorage.getItem(shared.keys.USER)!
                )['id'];
                const refreshToken = getCookie(shared.keys.REFRESH_TOKEN);
                let accessToken = getCookie(shared.keys.ACCESS_TOKEN);

                if (!accessToken) {
                    const { data: tokenData } = await axios.get(
                        `${SERVER_URL}/auth/refreshToken/${userID}`,
                        {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`,
                            },
                        }
                    );

                    accessToken = tokenData.payload['access_token'];
                    setCookie(shared.keys.ACCESS_TOKEN, accessToken, {
                        maxAge: 20 * 60,
                        sameSite: 'strict',
                    }); // 20 mins
                }

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

            <section className="w-full mt-8 py-8 h-full flex flex-col">
                <div className="flex flex-col md:flex-row md:items-center justify-center w-full max-w-[1200px] px-2 gap-4 md:gap-2">
                    <div className="flex-grow w-full">
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
                        text="New"
                        style={{ padding: '14px 8px' }}
                        className="scale-95 md:scale-100"
                        onClick={() => setShowCreateDialog(true)}
                    />
                </div>

                <DashboardSettings
                    privateOnly={privateOnly}
                    savedOnly={savedOnly}
                    viewStyle={repoView}
                    togglePrivateOnly={() => setPrivateOnly(!privateOnly)}
                    toggleSavedOnly={() => setSavedOnly(!savedOnly)}
                    toggleListView={toggleListView}
                    toggleGridView={toggleGridView}
                />

                <h2 className="font-bold text-2xl md:text-3xl text-left md:text-center mx-4 md:mx-0 cursor-default">
                    Your Repositories
                </h2>

                {loading && (
                    <div className="flex items-start px-4">
                        <SpinnerText text="Hang on, getting your repos." />
                    </div>
                )}

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

                <section className="px-4 my-8 w-full">
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
                                        onDeleteClick={() => {
                                            setSelectedRepoID(repo.id);
                                            setShowDeleteDialog(true);
                                        }}
                                    />
                                ))}
                            </section>
                        )
                    ) : (
                        !loading &&
                        !errorMsg && (
                            <h3 className="text-left md:text-center mt-8 text-neutral-500">
                                No Repos match this filter.
                            </h3>
                        )
                    )}
                </section>
            </section>
            <Footer />
        </>
    );
}
