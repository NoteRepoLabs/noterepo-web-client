'use client';

import spinningAnimation from '@/animated/spinner.json';
import { ChangeEvent, useState } from 'react';
import InputField from '../ui/InputField';
import FilledButton from '../ui/FilledButton';
import { CloseCircle } from 'iconsax-react';
import Toggle from '../ui/Toggle';
import ErrorText from '../ui/ErrorText';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SERVER_URL } from '@/config/constants';
import NetworkConfig from '@/config/network';
import ServerResponse from '@/types/serverTypes';
import { getCookie } from 'cookies-next';
import Lottie from 'lottie-react';

/* Create Repo Dialog Props */
interface CreateRepoDialogProps {
    onClick: () => void;
    onSuccess: (accessToken: string) => void;
}

interface CreateRepoBody {
    name: string;
    description: string;
    tags: string[];
    isPublic: boolean;
}

/* Create Repo Dialog Component */
export default function CreateRepoDialog(props: CreateRepoDialogProps) {
    // Component sate
    const [repoName, setRepoName] = useState('');
    const [repoDescription, setRepoDescription] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [isDisabled, setIsDisabled] = useState(false);
    const [makeVisible, setMakeVisible] = useState(false);
    const [nameError, setNameErr] = useState(false);
    const [descError, setDescErr] = useState(false);

    // Handle error states
    const showErrorState = (msg: string) => {
        setErrorMsg(msg);
        setIsDisabled(false);
    };

    // Create repo mutation
    const createRepoMutation = useMutation({
        mutationFn: async (body: CreateRepoBody) => {
            const userID = JSON.parse(localStorage.getItem('user')!)['id'];
            if (!userID) {
                showErrorState(
                    'Internal error, cannot create repo at this time.'
                );
                throw new Error('Bad state, user ID not present.');
            }
            try {
                const refreshToken = getCookie('refreshToken');

                // First, get the access token
                const tokenResponse = await axios.get(
                    `${SERVER_URL}/auth/refreshToken/${userID}`,
                    {
                        headers: {
                            ...NetworkConfig.headers,
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );

                const accessToken = tokenResponse.data.payload['access_token'];

                // Now, create the repository using the access token
                await axios.post(`${SERVER_URL}/users/${userID}/repo`, body, {
                    headers: {
                        ...NetworkConfig.headers,
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                // Notify parent
                props.onSuccess(accessToken);
            } catch (error) {
                showErrorState(
                    'Internal error, cannot create repo at this time.'
                );
                throw error;
            }
        },
        onSuccess() {
            console.log('Repo created successfully.');
        },
        onError: (error: any) => {
            console.error('An error occurred.', error);
            const serverErr = error.response?.data as ServerResponse;

            error.code == 'ERR_NETWORK'
                ? showErrorState(
                      'Cannot reach the server, check your connection.'
                  )
                : showErrorState(serverErr.message ?? 'An error occurred.');
        },
    });

    const createRepo = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDisabled(true);
        setErrorMsg('');

        // Verify name is not empty
        if (repoName.trim() == '') {
            setNameErr(true);
            showErrorState('Provide a name for your repo.');
            return;
        }

        // Verify description is not empty
        if (repoDescription.trim() == '') {
            setDescErr(true);
            showErrorState('Provide a description for your repo.');
            return;
        }

        const repoDetails: CreateRepoBody = {
            name: repoName,
            description: repoDescription,
            tags: [repoName],
            isPublic: makeVisible,
        };

        // Get access token + create repo
        createRepoMutation.mutate(repoDetails);
        setIsDisabled(false);
    };

    return (
        <section className="w-full h-screen grid place-items-center fixed top-0 left-0 z-[995]">
            <div className="block fixed inset-0 bg-neutral-900 bg-opacity-50 backdrop-blur-sm"></div>
            <section className="w-[90%] mt-12 max-w-lg px-4 py-8 bg-neutral-100 border-[1px] border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 z-[1000] flex flex-col justify-center rounded-xl items-center text-center shadow-lg relative">
                <CloseCircle
                    size="24"
                    variant="Bold"
                    className="text-neutral-300 cursor-pointer absolute top-2 left-2 transition-colors hover:text-neutral-500 dark:hover:text-neutral-100"
                    onClick={props.onClick}
                />
                <h3 className="text-2xl font-bold text-center dark:text-neutral-100 text-neutral-700">
                    Create Your Repo
                </h3>
                <p className="my-2 px-2 text-neutral-500 dark:text-neutral-300">
                    Once you&apos;ve created a repo, you can start uploading
                    files in them.
                </p>
                <form className="my-4 w-full">
                    <InputField
                        name="repo-name"
                        type="text"
                        id="repo-name"
                        value={repoName}
                        placeholder="Name"
                        error={nameError}
                        required={true}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setNameErr(false);
                            setErrorMsg('');
                            setRepoName(e.target.value);
                        }}
                    />
                    <InputField
                        name="repo-desc"
                        type="text"
                        id="repo-desc"
                        value={repoDescription}
                        placeholder="Description"
                        error={descError}
                        required={true}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setDescErr(false);
                            setErrorMsg('');
                            setRepoDescription(e.target.value);
                        }}
                    />
                    <div>
                        <Toggle
                            text="Make public"
                            onClick={() => {
                                setMakeVisible(!makeVisible);
                            }}
                            toggled={makeVisible}
                        />
                    </div>
                    {errorMsg && <ErrorText errorMsg={errorMsg} />}
                    <FilledButton
                        text={
                            createRepoMutation.isPending
                                ? 'Creating Repo'
                                : 'Create Repo'
                        }
                        disabled={isDisabled || createRepoMutation.isPending}
                        onClick={(e) => createRepo(e)}
                        icon={
                            createRepoMutation.isPending ? (
                                <Lottie
                                    animationData={spinningAnimation}
                                    loop={true}
                                    height={'32px'}
                                    width={'32px'}
                                    rendererSettings={{
                                        preserveAspectRatio: 'xMidYMid slice',
                                    }}
                                />
                            ) : null
                        }
                        styles={{
                            marginTop: "16px"
                        }}
                    />
                </form>
            </section>
        </section>
    );
}