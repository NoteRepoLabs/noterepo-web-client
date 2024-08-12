'use client';

import { CloseCircle } from 'iconsax-react';
import FilledButton from '../ui/FilledButton';
import OutlineButton from '../ui/OutlineButton';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { SERVER_URL } from '@/config/constants';
import NetworkConfig from '@/config/network';
import ServerResponse from '@/types/serverTypes';

interface DeleteRepoDialogProps {
    onCloseClick: () => void;
    onSuccess: (accessToken: string) => void;
    repoID: string;
}

/* Delete repo dialog component */
export default function DeleteRepoDialog(props: DeleteRepoDialogProps) {
    // Page state
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Handle error states
    const showErrorState = (msg: string) => {
        setErrorMsg(msg);
        setIsDisabled(false);
    };

    // Delete repo mutation
    const deleteRepoMutation = useMutation({
        mutationFn: async (repoID: string) => {
            const userID = JSON.parse(localStorage.getItem('user')!)['id'];
            if (!userID) {
                showErrorState(
                    'Internal error, cannot delete repo at this time.'
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

                // Now, delete the repository using the access token
                await axios.delete(
                    `${SERVER_URL}/users/${userID}/repo/${repoID}`,
                    {
                        headers: {
                            ...NetworkConfig.headers,
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                // Notify parent
                props.onSuccess(accessToken);
            } catch (error) {
                showErrorState(
                    'Internal error, cannot delete repo at this time.'
                );
                throw error;
            }
        },
        onSuccess() {
            console.log('Repo deleted successfully.');
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

    const deleteRepo = () => {
        setIsDisabled(true);
        setErrorMsg('');

        // Get access token + delete repo
        deleteRepoMutation.mutate(props.repoID);
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
                    onClick={props.onCloseClick}
                />
                <h3 className="text-2xl font-bold text-center dark:text-neutral-100 text-neutral-700">
                    Delete This Repo
                </h3>
                <p className="my-2 px-2 text-neutral-500 dark:text-neutral-300">
                    You&apos;re about to delete this repository which is
                    permanent. It cannot be undone.
                </p>
                <section className="w-full px-4 mt-4 flex gap-2 items-center">
                    <FilledButton
                        text="No, keep it"
                        onClick={props.onCloseClick}
                    />
                    <OutlineButton
                        text={
                            isDisabled || deleteRepoMutation.isPending
                                ? 'Deleting...'
                                : 'Yes, delete'
                        }
                        onClick={() => deleteRepo()}
                        disabled={isDisabled || deleteRepoMutation.isPending}
                    />
                </section>
            </section>
        </section>
    );
}
