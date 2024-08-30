import { Save2, Link1, Trash } from 'iconsax-react';
import TextButton from '../ui/TextButton';
import FileUploadButton from '../ui/FileUploadButton';
import { useRef, useState } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { MEGABYTE, SERVER_URL } from '@/config/constants';
import { useSearchParams } from 'next/navigation';
import UploadingFileDialog from './UploadingFileDialog';
import { RepoFile } from '@/types/repoTypes';
import { File02Icon } from 'hugeicons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RepoViewLayoutProps {
    files: RepoFile[];
}

const toastConfig = {
    hideProgressBar: false,
    draggable: false,
    theme: 'dark',
};

/** Repo View Layout Content Grid */
export default function RepoViewLayout(props: RepoViewLayoutProps) {
    const numberOfFiles = props.files.length;
    const searchParams = useSearchParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [showUploadingDialog, setShowUploadingDialog] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

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
            const refreshToken = getCookie('refreshToken');
            const tokenResponse = await axios.get(
                `${SERVER_URL}/auth/refreshToken/${userID}`,
                {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                }
            );
            const accessToken = tokenResponse.data.payload['access_token'];
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
            localStorage.setItem('forceUpdate', 'true');
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

    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
        ev
    ) => {
        setShowUploadingDialog(false);
        const file = ev.target.files?.[0];
        if (file) {
            if (file.size >= 50 * MEGABYTE) {
                toast.error('File limit is 50MB', toastConfig);
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

    return (
        <>
            <ToastContainer
                stacked
                toastStyle={{
                    backgroundColor: '#181B26',
                }}
            />
            {/* UPLOADING FILE DIALOG */}
            {showUploadingDialog && (
                <UploadingFileDialog progress={uploadProgress} />
            )}
            <main className="flex flex-col sm:grid sm:grid-cols-3 mt-6">
                <section className="sm:col-span-2 p-4 overflow-hidden">
                    <h2 className="text-2xl font-bold mb-4">
                        {numberOfFiles} File{numberOfFiles == 1 ? '' : 's'} Here
                    </h2>
                    {numberOfFiles == 0 && (
                        <p className="my-2 text-neutral-300">
                            No Files Uploaded yet.
                        </p>
                    )}
                    <ul className="my-2 flex flex-col gap-2 w-full">
                        {numberOfFiles != 0 &&
                            props.files.map((file) => (
                                <li
                                    key={file.id}
                                    className="w-full text-neutral-300 hover:text-vibrant-green transition-all flex items-start overflow-hidden"
                                >
                                    <File02Icon
                                        size={20}
                                        className="flex-shrink-0"
                                    />
                                    <a
                                        href={file.urlLink}
                                        target="_blank"
                                        title={file.name}
                                        rel="noopener noreferrer"
                                        className="flex-grow truncate text-ellipsis hover:underline underline-offset-4"
                                    >
                                        {file.name}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </section>
                <section className="col-span-1 border-l-0 border-t-2 sm:border-t-0 sm:border-l-2 border-highlight py-4 pl-4 sm:pl-8">
                    <ul className="flex flex-col gap-3">
                        <TextButton
                            text="Bookmark"
                            icon={<Save2 size={24} />}
                            onClick={() => {}}
                        />
                        <FileUploadButton
                            onClick={handleFileUploadButtonClick}
                            fileInputRef={fileInputRef}
                            handleFileChange={handleFileChange}
                        />
                        <TextButton
                            text="Share"
                            icon={<Link1 size={24} />}
                            onClick={() => {}}
                        />
                        <TextButton
                            text="Delete"
                            icon={<Trash size={24} />}
                            onClick={() => {}}
                            danger={true}
                        />
                    </ul>
                </section>
            </main>
        </>
    );
}
