/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import spinningAnimation from '@/animated/spinner.json';
import ErrorText from '@/components/ui/ErrorText';
import FilledButton from '@/components/ui/FilledButton';
import InputField from '@/components/ui/InputField';
import { SERVER_URL } from '@/config/constants';
import NetworkConfig from '@/config/network';
import CenteredGridLayout from '@/layout/CenteredGridLayout';
import shared from '@/shared/constants';
import { UsernameCredentials } from '@/types/authTypes';
import ServerResponse from '@/types/serverTypes';
import { encrypt } from '@/util/encryption';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';
import Lottie from 'lottie-react';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

/**
 * UI for configuring the user's username before proceeding to
 * the dashboard.
 * @returns a welcome page component
 */
export default function Page() {
    // Page state
    const [username, setUsername] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const searchParams = useSearchParams();

    /**
     * Mutation queries for configuring usernames.
     * On success: Save the access and refresh tokens as cookies,
     * then save the user instance to local storage and redirect.
     * On failure: Display a message telling the user why the configuration
     * attempt failed.
     */
    const updateUsernameMutation = useMutation({
        mutationFn: (creds: UsernameCredentials) => {
            return axios.post(
                `${SERVER_URL}/auth/setInitialUsername/${creds.userID}`,
                { username: creds.username },
                { headers: NetworkConfig.headers },
            );
        },
        onError: (err: AxiosError) => {
            console.error('An error occurred.', err);
            const serverErr = err.response?.data as ServerResponse;

            err.code == 'ERR_NETWORK'
                ? showErrorState('Could not sign up, check your connection.')
                : showErrorState(serverErr.message ?? 'An error occurred.');
        },
        onSuccess: (res) => {
            const data = res.data;
            const { access_token, refresh_token, ...user } = data.payload;

            // store user creds and tokens
            setCookie(shared.keys.ACCESS_TOKEN, access_token, {
                maxAge: 20 * 60,
                sameSite: 'strict',
            }); // 20 min
            setCookie(shared.keys.REFRESH_TOKEN, refresh_token, {
                maxAge: 5 * 24 * 60 * 60,
                sameSite: 'strict',
            }); // 5 days
            const { email, ...safeUser } = user; // exclude the email address

            // Encrypt and save the user info
            const encryptedUser = encrypt(safeUser);
            localStorage.setItem(shared.keys.USER, encryptedUser);

            console.log('saved credentials successfully.');
            window.location.href = '/';
        },
    });

    const showErrorState = (msg: string) => {
        setErrorMsg(msg);
        setIsDisabled(false);
    };

    /**
     * Performs various form validations before configuring
     * the username.
     * @param e React form event (button)
     */
    const submitUsername = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDisabled(true);

        // Username cannot be blank.
        if (!username) {
            showErrorState('Please fill the username field.');
            return;
        }

        // Username can't be less than 4 chars
        if (username.length < 4) {
            showErrorState('Username cannot be less than 4 characters.');
            return;
        }

        // Username cannot exceed 15 chars
        if (username.length > 15) {
            showErrorState('Username cannot exceed 15 characters.');
            return;
        }

        const userID = searchParams.get('userId');

        // UserID must be provided
        if (!userID) {
            showErrorState('Unable to verify account status, please sign in.');
            return;
        }

        // Make mutation request
        updateUsernameMutation.mutate({
            userID,
            username,
        });

        setIsDisabled(false);
    };

    return (
        <CenteredGridLayout>
            <section className="mt-8 w-full max-w-lg mx-auto text-center">
                <h1 className="font-bold text-3xl mb-6 text-neutral-900 dark:text-neutral-100">
                    Welcome Aboard!
                </h1>
                <p className="text-center text-base text-neutral-500 dark:text-neutral-300 mb-6">
                    We&apos;re almost done setting up your account. Add a
                    username to proceed.
                </p>
                <InputField
                    name="username"
                    type="text"
                    id="field-username"
                    value={username}
                    placeholder="Username"
                    required={true}
                    onChange={(e) => {
                        setErrorMsg('');
                        setUsername(e.target.value);
                    }}
                />
                {errorMsg && <ErrorText errorMsg={errorMsg} />}
                <FilledButton
                    text={
                        updateUsernameMutation.isPending
                            ? 'Setting Up'
                            : "Let's Go!"
                    }
                    icon={
                        updateUsernameMutation.isPending ? (
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
                    onClick={(e) => {
                        if (!isDisabled) {
                            submitUsername(e);
                        }
                    }}
                    disabled={isDisabled}
                />
            </section>
        </CenteredGridLayout>
    );
}
