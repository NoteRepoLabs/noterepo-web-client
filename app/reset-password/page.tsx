'use client';

import spinningAnimation from '@/animated/spinner.json';
import ErrorText from '@/components/ui/ErrorText';
import FilledButton from '@/components/ui/FilledButton';
import InputField from '@/components/ui/InputField';
import { SERVER_URL } from '@/config/constants';
import NetworkConfig from '@/config/network';
import { PasswordResetCredentials } from '@/types/authTypes';
import ServerResponse from '@/types/serverTypes';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Lottie from 'lottie-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
    // Page state
    const searchParams = useSearchParams();
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    // Mutation queries
    const resetPasswordMutation = useMutation({
        mutationFn: (creds: PasswordResetCredentials) => {
            return axios.post(
                `${SERVER_URL}/users/reset-password/${creds.userID}`,
                {
                    password: creds.password,
                    confirmPassword: creds.password,
                },
                {
                    headers: NetworkConfig.headers,
                }
            );
        },
        onSuccess: (res) => {
            const data = res.data;
            console.log(data);
        },
        onError: (err: AxiosError) => {
            console.error('An error occurred.', err);
            const serverErr = err.response?.data as ServerResponse;

            err.code == 'ERR_NETWORK'
                ? showErrorState('Could not sign up, check your connection.')
                : showErrorState(serverErr.message ?? 'An error occurred.');
        },
    });

    // Handles showing error states
    const showErrorState = (msg: string) => {
        setErrorMsg(msg);
        setIsDisabled(false);
    };

    // Handles input validation and makes reset password request
    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDisabled(true);

        // Password length cannot be less than 6
        if (password.length < 6 || passwordConfirmation.length < 6) {
            setIsPasswordError(true);
            showErrorState('Password should be at least 6 characters long.');
            return;
        }

        // Match new password
        if (password !== passwordConfirmation) {
            setIsPasswordError(true);
            showErrorState('Passwords mismatch.');
            return;
        }

        const userID = searchParams.get('userId');

        // Verify that userID is present
        if (!userID) {
            showErrorState('Invalid request state.');
            return;
        }
        
        // Make mutation requests
        resetPasswordMutation.mutate({
            userID,
            password,
        });
        setIsDisabled(false);
    };

    return (
        <section className="mt-8 w-full max-w-lg mx-auto">
            <h1 className="font-black text-center text-3xl text-neutral-900 dark:text-neutral-100">
                Reset Your Password
            </h1>
            <p className="text-center font-bold text-base text-neutral-500 dark:text-neutral-300 mt-6">
                We&apos;ll email you a link to reset your password if you
                already have an account with us.
            </p>
            <form className="my-8 w-full">
                <InputField
                    name="password-field"
                    type="password"
                    id="password-field"
                    value={password}
                    placeholder="Password"
                    required={true}
                    error={isPasswordError}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setIsPasswordError(false);
                        setErrorMsg('');
                        setPassword(e.target.value);
                    }}
                />
                <InputField
                    name="password-confirm-field"
                    type="password"
                    id="password-confirm-field"
                    value={passwordConfirmation}
                    placeholder="Confirm New Password"
                    required={true}
                    error={isPasswordError}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setIsPasswordError(false);
                        setErrorMsg('');
                        setPasswordConfirmation(e.target.value);
                    }}
                />
                {errorMsg && <ErrorText errorMsg={errorMsg} />}
                <FilledButton
                    text={
                        resetPasswordMutation.isPending ? 'Resetting Password' : 'Reset My Password'
                    }
                    icon={
                        resetPasswordMutation.isPending ? (
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
                        if (!resetPasswordMutation.isPending) {
                            onSubmit(e);
                        }
                    }}
                    disabled={resetPasswordMutation.isPending}
                />
            </form>
        </section>
    );
}
