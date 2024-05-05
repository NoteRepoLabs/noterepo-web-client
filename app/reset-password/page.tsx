'use client';

import spinningAnimation from '@/animated/spinner.json';
import ErrorText from '@/components/ui/ErrorText';
import FilledButton from '@/components/ui/FilledButton';
import InputField from '@/components/ui/InputField';
import { SERVER_URL } from '@/config/constants';
import { setCookie } from 'cookies-next';
import Lottie from 'lottie-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
    const controller = new AbortController();
    const signal = controller.signal;
    const searchParams = useSearchParams();
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isPending, setIsPending] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsPending(true);
        if (password.length < 6 || passwordConfirmation.length < 6) {
            setIsPasswordError(true);
            setErrorMsg('Password should be at least 6 characters long.');
            setIsPending(false);
            return;
        }

        if (password !== passwordConfirmation) {
            setIsPasswordError(true);
            setErrorMsg('Passwords mismatch.');
            setIsPending(false);
            return;
        }

        const userID = searchParams.get('userId');

        if (!userID) {
            setErrorMsg('Invalid request state.');
            setIsPending(false);
            return;
        }

        const credentials = { password, confirmPassword: passwordConfirmation };
        console.log(credentials);

        try {
            setTimeout(async () => {
                throw new Error('abort');
            }, 60 * 1000);
            await fetch(`${SERVER_URL}/users/reset-password/${userID}`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                signal: signal,
            }).then(async (res) => {
                await res.json().then((data) => {
                    console.log(data);
                    if (data.status == 'fail') {
                        setErrorMsg(data.message);
                        return;
                    }

                    setCookie('user', {
                        username: data.payload.username,
                        isVerified: data.payload.isVerified,
                        role: data.payload.role,
                    });

                    setErrorMsg('');
                    window.location.href = '/';
                });
            });
        } catch (e: any) {
            console.log(e);
            if (e.message == 'abort') {
                controller.abort();
                console.error('Aborting request.');
                setErrorMsg('Could not reach the server at this time.');
            }
            setErrorMsg('Could not reset your password.');
        } finally {
            setIsPending(false);
        }
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
                        isPending ? 'Resetting Password' : 'Reset My Password'
                    }
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
            </form>
        </section>
    );
}
