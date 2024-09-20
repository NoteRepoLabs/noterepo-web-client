/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import { MEGABYTE, SERVER_URL } from '@/config/constants';
import fetchRepos from '@/queries/fetchRepos';
import shared from '@/shared/constants';
import { RepoFile } from '@/types/repoTypes';
import axios from 'axios';
import { CookieValueTypes, getCookie, setCookie } from 'cookies-next';
import { Link1, Save2, Trash } from 'iconsax-react';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileListItem from '../ui/FileListItem';
import FileUploadButton from '../ui/FileUploadButton';
import TextButton from '../ui/TextButton';
import DeleteRepoDialog from './DeleteRepoDialog';
import ShareRepoDialog from './ShareRepoDialog';
import UploadingFileDialog from './UploadingFileDialog';
import { useMutation } from '@tanstack/react-query';
import NetworkConfig from '@/config/network';
import Image from "next/image";

interface RepoViewLayoutProps {
    files: RepoFile[];
    isPublic: boolean;
    repoID: string;
}

interface IDeleteMutationReq {
    accessToken: CookieValueTypes;
    userID: string;
    repoID: string;
    fileID: string;
}

const toastConfig = {
    hideProgressBar: false,
    draggable: false,
    theme: 'dark',
};

/** Repo View Layout Content */
export default function RepoViewLayout(props: RepoViewLayoutProps) {
    const numberOfFiles = props.files.length;
    const searchParams = useSearchParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [shouldHide, setShouldHide] = useState(false);
    const [targetID, setTargetID] = useState('');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUploadingDialog, setShowUploadingDialog] = useState(false);
    const [showShareRepoDialog, setShowShareRepoDialog] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const deleteFileMutation = useMutation({
        mutationFn: (creds: IDeleteMutationReq) => {
            const { userID, repoID, fileID } = creds;
            const endpoint = `${SERVER_URL}/users/${userID}/repo/${repoID}/file/${fileID}`;
            return axios.delete(endpoint, {
                headers: {
                    ...NetworkConfig.headers,
                    Authorization: `Bearer ${creds.accessToken}`,
                },
            });
        },
        onSuccess: () => {
            toast.success('File deleted successfully', toastConfig);
            localStorage.setItem(shared.keys.FORCE_UPDATE, 'true');
            setShouldHide(true);
            window.location.reload();
        },
        onError: () => {
            toast.error('Something went wrong.');
            // window.location.reload();
        },
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
            () => {
                localStorage.setItem(shared.keys.FORCE_UPDATE, 'true');

                const cacheKey = `_cr-${getRepoIDFromParams()}`;
                localStorage.removeItem(cacheKey);
                toast.success('This repo has been deleted.', {
                    ...toastConfig,
                    onOpen: () => {
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 100);
                    },
                });
            },
            null,
            (err) => {
                console.error('Failed to delete this repo:', err);
                toast.error('Failed to delete this repo.', toastConfig);
            }
        );
    };

    /**
     * Utility function to extract the repo id from the page.
     * @returns a repo id string.
     */
    const getRepoIDFromParams = () => {
        const repoID = searchParams.get('repo');
        return repoID ?? '';
    };

    /**
     * Uses a React reference to indirectly trigger the hidden file input field
     */
    const handleFileUploadButtonClick = () => {
        fileInputRef.current?.click();
    };

    /**
     * Attempts to upload a file to the server.
     * Firstly, we grab the user's ID and refresh token. Then generate an access token from there.
     * Then we make a multi-part form request to upload the file using our credentials.
     * The page is refreshed if successful or an alert is propagated otherwise.
     */
    const uploadSelectedFile = async (file: File) => {
        try {
            const userID = searchParams.get('user');
            const repoID = searchParams.get('repo');
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

            const formData = new FormData();
            formData.append('file', file);

            // Upload file request
            setShowUploadingDialog(true);
            await axios.post(
                `${SERVER_URL}/users/${userID}/repo/${repoID}/file`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) /
                                (progressEvent.total ?? 1)
                        );
                        setUploadProgress(percentCompleted);
                    },
                }
            );

            // DEBUG: console.log(data);
            localStorage.setItem(shared.keys.FORCE_UPDATE, 'true');
            toast.success("We've uploaded your file!", {
                ...toastConfig,
                onOpen: () => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                },
            });
        } catch (err) {
            toast.error(
                'An error occurred while uploading this file',
                toastConfig
            );
            throw err;
        } finally {
            setShowUploadingDialog(false);
        }
    };

    /**
     * Handles selecting a file from the user's computer. Checks for file limit
     * constraints and if passing, sends it to the server.
     * @param ev Event
     * @returns nothing
     */
    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
        ev
    ) => {
        setShowUploadingDialog(false);
        const file = ev.target.files?.[0];
        if (file) {
            if (file.size >= shared.fileLimit * MEGABYTE) {
                toast.error(`File limit is ${shared.fileLimit}MB`, toastConfig);
                return;
            }
            try {
                uploadSelectedFile(file);
            } catch {
                toast.error(
                    'Something went wrong while uploading your file',
                    toastConfig
                );
            }
        } else {
            toast.error('File upload failed', toastConfig);
        }
    };

    const handleFileDeletion = async (fileID: string) => {
        setTargetID(fileID);
        try {
            const repoID = searchParams.get('repo');
            const userID = searchParams.get('user');

            if (!repoID || !userID) {
                toast.error('This link is broken, cannot delete this file.');
                window.location.href = '/';
                return;
            }

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

            deleteFileMutation.mutate({
                repoID,
                userID,
                accessToken,
                fileID,
            });
        } catch (err) {
            // DEBUG:
            console.error(err);
            toast.error(
                'Something went wrong while deleting this file',
                toastConfig
            );
        }
    };

    return (
        <>
            <ToastContainer
                stacked
                toastStyle={{
                    backgroundColor: '#181B26',
                }}
            />

            {/* DELETE REPO DIALOG */}
            {showDeleteDialog && (
                <DeleteRepoDialog
                    repoID={getRepoIDFromParams()}
                    onCloseClick={() => setShowDeleteDialog(false)}
                    onSuccess={handleRepoModificationSuccess}
                />
            )}

            {/* UPLOADING FILE DIALOG */}
            {showUploadingDialog && (
                <UploadingFileDialog progress={uploadProgress} />
            )}

            {/* SHARE REPO DIALOG */}
            {showShareRepoDialog && (
                <ShareRepoDialog
                    onClick={() => setShowShareRepoDialog(false)}
                    repoID={props.repoID}
                />
            )}

            {/* FILE LIST */}
            <main className="mt-6 w-full md:grid md:grid-cols-4 flex flex-col">
                <section className="col-span-3 w-full p-4 overflow-hidden">
                    <h2 className="text-2xl font-bold mb-4">
                        {numberOfFiles} File{numberOfFiles == 1 ? '' : 's'} Here
                    </h2>
                    {numberOfFiles == 0 && (
                        <>
                            <div className="flex flex-col justify-center mt-12">
                                <div className="flex justify-center">
                                    <Image
                                        src={'/img/EmptyBooks.svg'}
                                        alt={'empty'}
                                        width={200}
                                        height={200}
                                        priority={true}
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-center text-neutral-500 dark:text-neutral-300">
                                    No Files Uploaded yet.
                                </h3>
                            </div>
                        </>
                    )}
                    <ul className="my-2 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {numberOfFiles != 0 &&
                            props.files.map((file) => (
                                <li
                                    key={file.id}
                                    className="w-full text-neutral-300 col-span-1"
                                >
                                    <div className="w-full flex items-center">
                                        <FileListItem
                                            filename={file.name}
                                            link={file.urlLink}
                                            shareMode={false}
                                            isPending={
                                                file.id == targetID &&
                                                deleteFileMutation.isPending
                                            }
                                            onDeleteClick={() =>
                                                handleFileDeletion(file.id)
                                            }
                                            hidden={
                                                file.id == targetID &&
                                                shouldHide
                                            }
                                        />
                                    </div>
                                </li>
                            ))}
                    </ul>
                </section>

                {/* SIDEBAR */}
                <section className="border border-neutral-300 dark:border-highlight md:col-span-1 p-4 dark:bg-mod-700 bg-mod-200 m-2 md:m-0 rounded-lg md:h-[200px] max-h-[200px]">
                    <h3 className="text-sm font-bold md:text-center mb-2">
                        ACTIONS
                    </h3>
                    <ul className="flex flex-col gap-3">
                        <FileUploadButton
                            onClick={handleFileUploadButtonClick}
                            fileInputRef={fileInputRef}
                            handleFileChange={handleFileChange}
                        />
                        <TextButton
                            text="Bookmark"
                            icon={<Save2 size={24} />}
                            onClick={() => {}}
                        />
                        {/* ONLY PUBLIC REPOS CAN BE SHARED */}
                        {props.isPublic && (
                            <TextButton
                                text="Share"
                                icon={<Link1 size={24} />}
                                onClick={() => setShowShareRepoDialog(true)}
                            />
                        )}
                        <TextButton
                            text="Delete Repo"
                            icon={<Trash size={24} />}
                            onClick={() => setShowDeleteDialog(true)}
                            danger={true}
                        />
                    </ul>
                </section>
            </main>
        </>
    );
}
