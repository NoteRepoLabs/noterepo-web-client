'use client';

import spinningAnimation from '@/animated/spinner.json';
import ErrorText from '@/components/ui/ErrorText';
import FilledButton from '@/components/ui/FilledButton';
import Header from '@/components/ui/Header';
import InputField from '@/components/ui/InputField';
import Link from '@/components/ui/Link';
import { EMAIL_PATTERN, SERVER_URL } from '@/config/constants';
import NetworkConfig from '@/config/network';
import { AuthCredentials } from '@/types/authTypes';
import ServerResponse from '@/types/serverTypes';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';
import Lottie from 'lottie-react';
import { useState } from 'react';

export default function Page() {
    // Page state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    // Mutation queries
    const signInMutation = useMutation({
        mutationFn: (creds: AuthCredentials) => {
            return axios.post(`${SERVER_URL}/auth/sign-in`, creds, {
                headers: NetworkConfig.headers,
            });
        },
        onSuccess: (res) => {
            const data = res.data;
            console.log(data);

            const { access_token, refresh_token, ...user } = data.payload;
            // store user creds and tokens
            setCookie('accessToken', access_token, {
                maxAge: 60 * 60,
                sameSite: 'strict',
            });
            setCookie('refreshToken', refresh_token, {
                maxAge: 5 * 24 * 60 * 60,
                sameSite: 'strict',
            });
            setCookie('user', user, {
                maxAge: 5 * 24 * 60 * 60,
                sameSite: 'strict',
            });
            console.log('saved credentials successfully.');
            // Redirect to dashboard
            window.location.href = '/';
        },
        onError: (err: AxiosError) => {
            console.error('An error occurred.', err);
            const serverErr = err.response?.data as ServerResponse;

            err.code == 'ERR_NETWORK'
                ? showErrorState('Could not sign up, check your connection.')
                : showErrorState(serverErr.message ?? 'An error occurred.');
        },
    });

    // Show error states
    const showErrorState = (msg: string) => {
        setIsEmailError(true);
        setErrorMsg(msg);
        setIsDisabled(false);
    };

    /**
     * Verify fields and make sign-in request
     */
    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDisabled(true);
        setErrorMsg('');

        // Email cannot be empty
        if (email.trim() == '') {
            showErrorState('Please fill the email field.');
            return;
        }

        // Password cannot be empty
        if (password.trim() == '') {
            showErrorState('Please fill the password field.');
            return;
        }

        // Passwords can't be less than 6 characters long
        if (password.trim().length < 6 || password.length < 6) {
            showErrorState('Password should be more than 6 characters long.');
            return;
        }

        // Match emails properly
        if (!EMAIL_PATTERN.test(email)) {
            showErrorState('Enter a valid email address.');
            return;
        }

        // Prepare credentials
        const credentials = { email, password };
        console.log(credentials);

        // Make mutation request
        signInMutation.mutate(credentials);
        setIsDisabled(false);
    };

    return (
        <section className="mt-8 w-full max-w-lg mx-auto">
            <Header
                content="You're one step away from accessing all your lecture materials, sign in to continue."
                aside="Sign In"
            />
            <form className="my-8 w-full">
                <InputField
                    name="email-field"
                    type="email"
                    id="email-field"
                    value={email}
                    placeholder="Email"
                    required={true}
                    error={isEmailError}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setIsEmailError(false);
                        setErrorMsg('');
                        setEmail(e.target.value);
                    }}
                />
                <InputField
                    name="password-field"
                    type="password"
                    id="password-field"
                    value={password}
                    placeholder="Password"
                    error={isPasswordError}
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setIsPasswordError(false);
                        setErrorMsg('');
                        setPassword(e.target.value);
                    }}
                />
                {errorMsg && <ErrorText errorMsg={errorMsg} />}
                <FilledButton
                    text={signInMutation.isPending ? 'Signing In' : 'Sign In'}
                    icon={
                        signInMutation.isPending ? (
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
                            onSubmit(e);
                        }
                    }}
                    disabled={isDisabled}
                />
                <section className="w-full mt-8 text-center">
                    <Link
                        underlined={true}
                        href={'/signup'}
                        text={'Sign Up'}
                        style={{ marginRight: '24px' }}
                    />
                    <Link
                        underlined={true}
                        href={'/forgot-password'}
                        text={'Forgot Password?'}
                    />
                </section>
            </form>
        </section>
    );
}
