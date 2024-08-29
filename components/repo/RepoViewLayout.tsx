import { Save2, Link1, Trash } from 'iconsax-react';
import TextButton from '../ui/TextButton';
import FileUploadButton from '../ui/FileUploadButton';
import { useRef } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { SERVER_URL } from '@/config/constants';
import { useSearchParams } from 'next/navigation';

/** Repo View Layout Content Grid */
export default function RepoViewLayout() {
    const searchParams = useSearchParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

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
            const response = await fetch(
                `${SERVER_URL}/users/${userID}/repo/${repoID}/file`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: formData,
                }
            );

            const data = await response.json();
            console.log(data);
        } catch (err) {
            throw err;
        }
    };

    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
        ev
    ) => {
        const file = ev.target.files?.[0];
        if (file) {
            try {
                uploadSelectedFile(file);
            } catch {
                alert("We can't upload this file at the moment!");
            }
        } else {
            alert('Failed to upload file!');
        }
    };

    return (
        <>
            <main className="flex flex-col sm:grid grid-cols-3 mt-6 border-t-2 border-highlight">
                <section className="col-span-2 p-4">
                    <h2 className="text-2xl font-bold">0 Files</h2>
                    <p className="my-2 text-neutral-300">
                        No Files Uploaded yet.
                    </p>
                    {/* <ul className="my-4">
                        <li>File</li>
                        <li>File</li>
                    </ul> */}
                </section>
                <section className="col-span-1 border-l-0 border-t-2 sm:border-t-0 sm:border-l-2 border-highlight p-4">
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
