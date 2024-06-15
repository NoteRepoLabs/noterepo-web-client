'use client';

import spinningAnimation from '@/animated/spinner.json';
import ErrorText from '@/components/ui/ErrorText';
import FilledButton from '@/components/ui/FilledButton';
import Header from '@/components/ui/Header';
import InputField from '@/components/ui/InputField';
import Link from '@/components/ui/Link';
import { EMAIL_PATTERN, SERVER_URL } from '@/config/constants';
import NetworkConfig from '@/config/network';
import { SignUpCredentials } from '@/types/authTypes';
import ServerResponse from '@/types/serverTypes';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Eye, EyeSlash } from 'iconsax-react';
import Lottie from 'lottie-react';
import { useState } from 'react';

export default function Page() {
    // State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    // Mutation queries
    const signUpMutation = useMutation({
        mutationFn: (credentials: SignUpCredentials) => {
            return axios.post(`${SERVER_URL}/auth/sign-up`, credentials, {
                headers: NetworkConfig.headers,
            });
        },
        onError: (error: AxiosError) => {
            console.error('An error occurred.', error);
            const serverErr = error.response?.data as ServerResponse;

            error.code == 'ERR_NETWORK'
                ? showErrorState('Could not sign up, check your connection.')
                : showErrorState(serverErr.message ?? 'An error occurred.');
        },
        onSuccess: (data) => {
            console.log('User:', data);
            window.location.href = '/verify-email';
        },
    });

    // Handles showing error state
    const showErrorState = (msg: string) => {
        setErrorMsg(msg);
        setIsDisabled(false);
    };

    // Some validation, then make requests to the server
    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDisabled(true);
        setErrorMsg('');

        // Verify email address is not empty
        if (email == '') {
            setIsEmailError(true);
            showErrorState('Please fill the email field.');
            return;
        }

        // Verify password isn't empty either
        if (password == '') {
            setIsPasswordError(true);
            showErrorState('Please fill the password field.');
            return;
        }

        // Password length must be at least 6 chars
        if (password.length < 6) {
            setIsPasswordError(true);
            showErrorState('Password cannot be shorter than 6 characters.');
            return;
        }

        // Verify that the email follows the right pattern regex
        if (!EMAIL_PATTERN.test(email)) {
            setIsEmailError(true);
            showErrorState('Enter a valid email address.');
            return;
        }

        // Prepare credentials for request
        const credentials = { email, password };
        console.log(credentials);

        // Make mutation request
        signUpMutation.mutate(credentials);
        setIsDisabled(false);
    };

    return (
        <section className="mt-8 w-full max-w-lg mx-auto">
            <Header
                content="Create a new account to get started."
                aside="Sign Up"
            />
            <form className="my-8 w-full" action="/">
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
                    type={isPasswordVisible ? 'text' : 'password'}
                    id="password-field"
                    value={password}
                    placeholder="Password"
                    error={isPasswordError}
                    icon={
                        password &&
                        (isPasswordVisible ? (
                            <EyeSlash
                                size="24"
                                color="#A1A7B5"
                                className="absolute right-[16px] top-[50%] transform -translate-y-1/2 cursor-pointer"
                                onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                }
                            />
                        ) : (
                            <Eye
                                size="24"
                                color="#A1A7B5"
                                className="absolute right-[16px] top-[50%] transform -translate-y-1/2 cursor-pointer"
                                onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                }
                            />
                        ))
                    }
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setIsPasswordError(false);
                        setErrorMsg('');
                        setPassword(e.target.value);
                    }}
                />
                {errorMsg && <ErrorText errorMsg={errorMsg} />}
                <FilledButton
                    text={signUpMutation.isPending ? 'Signing Up' : 'Sign Up'}
                    icon={
                        signUpMutation.isPending ? (
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
                        if (!signUpMutation.isPending) {
                            onSubmit(e);
                        }
                    }}
                    disabled={isDisabled || signUpMutation.isPending}
                />
                <section className="w-full flex justify-center mt-8">
                    <Link
                        underlined={true}
                        href={'/signin'}
                        text={'Sign In'}
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
