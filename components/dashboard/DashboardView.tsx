'use client';

import spinningAnimation from '@/animated/spinner.json';
import { SERVER_URL } from '@/config/constants';
import { UserInterface } from '@/types/userTypes';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { SearchNormal1 } from 'iconsax-react';
import Lottie from 'lottie-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CreateRepoDialog from '../repo/CreateRepoDialog';
import RepoCard from '../repo/RepoCard';
import InputField from '../ui/InputField';
import IconButton from './IconButton';
import Repo from '@/types/repoTypes';
import DeleteRepoDialog from '../repo/DeleteRepoDialog';

export interface DashboardProps {
    user: UserInterface;
}

/** Dashboard view component */
export default function DashboardView(props: DashboardProps) {
    // Page state
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedRepoID, setSelectedRepoID] = useState('');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [repos, setRepos] = useState<Repo[]>([]);

    // Filter by name or description
    const filteredRepos = repos.filter(
        (repo) =>
            repo.name.toLowerCase().includes(search.toLowerCase()) ||
            repo.description.toLowerCase().includes(search.toLowerCase())
    );

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
            setRepos(response.data['payload']);
            console.log(response.data['payload']);
        } catch (error) {
            console.error('Failed to fetch repositories:', error);
        }
    };

    const handleRepoModificationSuccess = (accessToken: string) => {
        fetchRepos(accessToken).then(() => {
            setShowCreateDialog(false);
            setShowDeleteDialog(false);
        });
    };

    // Fetch repos on load
    useEffect(() => {
        const fetchInitialRepos = async () => {
            try {
                const userID = JSON.parse(localStorage.getItem('user')!)['id'];
                const refreshToken = getCookie('refreshToken');

                // Get the access token
                const tokenResponse = await axios.get(
                    `${SERVER_URL}/auth/refreshToken/${userID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );

                const accessToken = tokenResponse.data.payload['access_token'];

                // Fetch the repositories
                fetchRepos(accessToken).then(() => {
                    setLoading(false);
                });
            } catch (error) {
                console.error('Failed to initialize repos:', error);
                setLoading(false);
            }
        };

        fetchInitialRepos();
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
                        {/* SEARCH BOX */}
                        <InputField
                            name={'search'}
                            type={'text'}
                            id={'search-field'}
                            value={search}
                            placeholder={'Search your repos'}
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
                {loading ? (
                    <section className="mt-12">
                        <div className="flex items-center gap-2 w-full justify-center">
                            <div className="max-w-8 max-h-8">
                                <Lottie
                                    animationData={spinningAnimation}
                                    loop={true}
                                    height={'32px'}
                                    width={'32px'}
                                    rendererSettings={{
                                        preserveAspectRatio: 'xMidYMid slice',
                                    }}
                                />
                            </div>
                            <h1 className="font-bold text-xl text-center text-neutral-300">
                                Hang on, loading your repos...
                            </h1>
                        </div>
                    </section>
                ) : repos.length === 0 ? (
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
                ) : filteredRepos.length != 0 ? (
                    <section className="px-2 sm:px-8 my-8 w-full grid gap-4 grid-cols-1 justify-items-center sm:grid-cols-3">
                        {filteredRepos.map((repo, id) => (
                            <RepoCard
                                key={id}
                                repo={repo}
                                onDeleteClick={() => {
                                    setSelectedRepoID(repo.id);
                                    setShowDeleteDialog(true);
                                }}
                            />
                        ))}
                    </section>
                ) : (
                    <h3 className="mt-8 text-neutral-500">
                        No Repos match this filter.
                    </h3>
                )}
            </section>
        </>
    );
}
