/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import FileListItem from '@/components/ui/FileListItem';
import Footer from '@/components/ui/Footer';
import SpinnerText from '@/components/ui/SpinnerText';
import { SERVER_URL } from '@/config/constants';
import NetworkConfig from '@/config/network';
import Repo from '@/types/repoTypes';
import ServerResponse from '@/types/serverTypes';
import axios, { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Responsible for listing shared public repositories
 */
export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [repo, setRepo] = useState<Repo>();
    const [numberOfFiles, setNumberOfFiles] = useState(0);
    const searchParams = useSearchParams();

    // Error related state
    const showErrorState = (msg: string) => {
        setErrorMsg(msg);
    };

    // Responsible for fetching repositories with this id
    const onLoad = async () => {
        setErrorMsg('');
        const repoID = searchParams.get('id');

        // invalid page state
        if (!repoID) {
            setIsLoading(false);
            showErrorState('Oops, this link is broken.');
            return;
        }

        try {
            const { data: fetchedData } = await axios.get(
                `${SERVER_URL}/users/repo/${repoID}/share`,
                NetworkConfig
            );
            const payload = fetchedData['payload'];

            setNumberOfFiles(payload['files'].length);
            setRepo(payload);
        } catch (err) {
            const thisError = err as AxiosError;
            console.error('An error occurred.', err);
            const serverErr = thisError.response?.data as ServerResponse;

            if (thisError.code == 'ERR_NETWORK') {
                showErrorState("We're having trouble connecting right now.");
            } else {
                if (thisError.response?.status == 500) {
                    showErrorState('This repository does not exist.');
                } else {
                    showErrorState(
                        serverErr.message ??
                            'Oops, an unknown error has occurred. Contact the devs at noterepo.engineering@gmail.com'
                    );
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <section className="flex flex-col h-screen">
            <section className="mt-8 w-full max-w-3xl mx-auto flex-grow">
                {/* SPINNER */}
                {isLoading && <SpinnerText text="We're getting the files..." />}

                {/* ERROR MSG */}
                {errorMsg && (
                    <h2 className="w-full text-center mt-8 text-vibrant-red text-xl">
                        {errorMsg}
                    </h2>
                )}

                {/* METADATA + FILES */}
                {!isLoading && !errorMsg && repo && (
                    <section className="flex flex-col items-center gap-2 mb-4">
                        <h4 className="text-xs font-bold dark:text-neutral-500 mb-4">
                            VIEWING SHARED REPO
                        </h4>
                        <h2 className="font-bold text-3xl">{repo.name}</h2>
                        <p className="text-neutral-300">{repo.description}</p>
                    </section>
                )}

                {repo && numberOfFiles != 0 ? (
                    <>
                        <main className="mt-6 w-full md:grid md:grid-cols-4 flex flex-col">
                            <section className="col-span-3 w-full p-4 overflow-hidden">
                                <h2 className="text-2xl font-bold mb-4">
                                    {numberOfFiles} File
                                    {numberOfFiles == 1 ? '' : 's'} Here
                                </h2>
                                {numberOfFiles == 0 && (
                                    <p className="my-2 text-neutral-300">
                                        No Files Uploaded yet.
                                    </p>
                                )}
                                <ul className="my-2 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    {numberOfFiles != 0 &&
                                        repo.files.map((file) => (
                                            <li
                                                key={file.id}
                                                className="w-full text-neutral-300 col-span-1"
                                            >
                                                <div className="w-full">
                                                    <FileListItem
                                                        filename={file.name}
                                                        link={file.urlLink}
                                                        shareMode={true}
                                                        isPending={false}
                                                        hidden={false}
                                                        onDeleteClick={() => {}}
                                                    />
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </section>
                        </main>
                    </>
                ) : (
                    !isLoading &&
                    !errorMsg && (
                        <h3 className="mt-4 text-sm text-center">
                            This user hasn&apos;t uploaded any files yet.
                        </h3>
                    )
                )}
            </section>
            <Footer />
        </section>
    );
}
