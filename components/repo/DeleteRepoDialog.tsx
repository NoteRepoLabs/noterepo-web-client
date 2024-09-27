/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import spinningAnimation from '@/animated/spinner.json';
import { CloseCircle } from 'iconsax-react';
import FilledButton from '../ui/FilledButton';
import OutlineButton from '../ui/OutlineButton';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getCookie, setCookie } from 'cookies-next';
import axios from 'axios';
import { SERVER_URL } from '@/config/constants';
import NetworkConfig from '@/config/network';
import ServerResponse from '@/types/serverTypes';
import ErrorText from '../ui/ErrorText';
import Lottie from 'lottie-react';
import shared from '@/shared/constants';
import Modal from '../ui/Modal';

interface DeleteRepoDialogProps {
    onCloseClick: () => void;
    onSuccess: (accessToken: string) => void;
    userID: string;
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
            const userID = props.userID;
            if (!userID) {
                showErrorState(
                    'Internal error, cannot delete repo at this time.'
                );
                throw new Error('Bad state, user ID not present.');
            }
            try {
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
                props.onSuccess(accessToken!);
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
        <Modal>
            <CloseCircle
                size="24"
                variant="Bold"
                className="text-neutral-300 cursor-pointer absolute top-2 left-2 transition-colors hover:text-neutral-500 dark:hover:text-neutral-100"
                onClick={props.onCloseClick}
            />
            <h3 className="text-2xl font-bold text-center dark:text-neutral-100 text-neutral-700">
                Delete This Repo
            </h3>
            <p className="my-2 text-neutral-500 dark:text-neutral-300">
                You&apos;re about to delete this repository which is permanent.
                It cannot be undone.
            </p>
            {errorMsg && <ErrorText errorMsg={errorMsg} />}
            <section className="w-full max-w-[90%] mt-4 flex gap-2 items-center">
                <FilledButton
                    text="No, keep it"
                    onClick={props.onCloseClick}
                    tinyText={true}
                />
                <OutlineButton
                    text={
                        isDisabled || deleteRepoMutation.isPending
                            ? 'Deleting...'
                            : 'Yes, delete'
                    }
                    onClick={() => deleteRepo()}
                    disabled={isDisabled || deleteRepoMutation.isPending}
                    icon={
                        isDisabled || deleteRepoMutation.isPending ? (
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
                        ) : null
                    }
                    tinyText={true}
                />
            </section>
        </Modal>
    );
}
