'use client';

import spinningAnimation from '@/animated/spinner.json';
import ErrorText from '@/components/ui/ErrorText';
import FilledButton from '@/components/ui/FilledButton';
import Header from '@/components/ui/Header';
import InputField from '@/components/ui/InputField';
import Link from '@/components/ui/Link';
import { EMAIL_PATTERN, SERVER_URL } from '@/config/constants';
import { Eye, EyeSlash } from 'iconsax-react';
import Lottie from 'lottie-react';
import { useState } from 'react';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    // Handles showing error state
    const showErrorState = (msg: string) => {
        setErrorMsg(msg);
        setIsPending(false);
    }

    // Some validation, then make requests to the server
    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsPending(true);
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
            showErrorState('Password cannot be shorter than 6 characters.')
            return;
        }

        // Verify that the email follows the right pattern regex
        if (!EMAIL_PATTERN.test(email)) {
            setIsEmailError(true);
            showErrorState('Enter a valid email address.')
            return;
        }

        // Prepare credentials for request
        const credentials = { email, password };
        console.log(credentials);

        // Make sign-up query
        await fetch(`${SERVER_URL}/auth/sign-up`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        })
            .then(async (res) => {
                if (!res.ok) {
                    await res.json().then((json) => {
                        const msg =
                            json.message ??
                            'Could not sign in, please retry later.';
                        setErrorMsg(msg);
                        return;
                    });
                } else {
                    await res.json().then((data) => {
                        console.log(data);
                        window.location.href = '/verify-email';
                    });
                }
            })
            .catch(() =>
                setErrorMsg('Could not reach the server at this time.')
            )
            .finally(() => setIsPending(false));
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
                    text={isPending ? 'Signing Up' : 'Sign Up'}
                    icon={
                        isPending ? (
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
                        if (!isPending) {
                            onSubmit(e);
                        }
                    }}
                    disabled={isPending}
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
