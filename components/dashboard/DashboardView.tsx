/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import { SERVER_URL } from '@/config/constants';
import fetchRepos from '@/queries/fetchRepos';
import shared from '@/shared/constants';
import Repo from '@/types/repoTypes';
import { IUser } from '@/types/userTypes';
import { isCacheExpired, saveReposToCache } from '@/util/cache';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { Search01Icon } from 'hugeicons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CreateRepoDialog from '../repo/CreateRepoDialog';
import DeleteRepoDialog from '../repo/DeleteRepoDialog';
import RepoGridItem from '../repo/RepoGridItem';
import RepoListItem from '../repo/RepoListItem';
import Footer from '../ui/Footer';
import InputField from '../ui/InputField';
import SpinnerText from '../ui/SpinnerText';
import DashboardSettings from './DashboardSettings';
import IconButton from './IconButton';
import { decrypt } from '@/util/encryption';

export interface DashboardProps {
    user: IUser;
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
    const savedRepoView = localStorage
        .getItem(shared.keys.REPO_VIEW)
        ?.toUpperCase() as ViewType | undefined;

    // Page state
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [repoView, setRepoView] = useState<ViewType>(savedRepoView ?? 'LIST');
    const [prevAction, setPrevAction] = useState('');
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
        // Delete cache for deleted repos
        if (prevAction == 'DELETE') {
            localStorage.removeItem(`_cr-${selectedRepoID}`);
            setPrevAction('');
        }
        fetchRepos(
            props.user.id,
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
        // Only if force update isn't triggered
        const shouldForceUpdate =
            localStorage.getItem(shared.keys.FORCE_UPDATE) == 'true';
        if (
            !shouldForceUpdate &&
            !isCacheExpired() &&
            localStorage.getItem(shared.keys.REPOS)
        ) {
            console.log('[INFO]: Cache hit.');
            const cachedRepos = decrypt(localStorage.getItem(shared.keys.REPOS));
            setRepos(cachedRepos);
            setLoading(false);
        } else {
            console.log('[INFO]: Cache miss.');
            try {
                const userID = props.user.id;
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
                localStorage.setItem(shared.keys.FORCE_UPDATE, 'false');
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <section className="flex flex-col h-[calc(100vh-16px)]">
            <section className="flex-grow">
                {/* CREATE REPO DIALOG */}
                {showCreateDialog && (
                    <CreateRepoDialog
                        userID={props.user.id}
                        onClick={() => setShowCreateDialog(false)}
                        onSuccess={handleRepoModificationSuccess}
                    />
                )}

                {/* DELETE REPO DIALOG */}
                {showDeleteDialog && (
                    <DeleteRepoDialog
                        userID={props.user.id}
                        repoID={selectedRepoID}
                        onCloseClick={() => setShowDeleteDialog(false)}
                        onSuccess={handleRepoModificationSuccess}
                    />
                )}

                <section className="w-full mt-8 pt-8 flex flex-col">
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
                                    <Search01Icon
                                        size="24"
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
                            className="w-full md:!w-[140px] border-2 border-vibrant-green"
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
                        <div className="flex md:justify-center items-start">
                            <SpinnerText text="Just a moment..." />
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

                    <section className="px-4 mt-8 mb-4 w-full">
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
                                                setPrevAction('DELETE');
                                                setShowDeleteDialog(true);
                                            }}
                                        />
                                    ))}
                                </section>
                            )
                        ) : (
                            repos.length != 0 &&
                            !loading &&
                            !errorMsg && (
                                <h3 className="text-left md:text-center mt-8 text-neutral-500">
                                    No Repos match this filter.
                                </h3>
                            )
                        )}
                    </section>
                </section>
            </section>
            <div className="mb-8">
                <Footer />
            </div>
        </section>
    );
}
