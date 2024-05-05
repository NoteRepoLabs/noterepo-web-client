'use client';

import spinningAnimation from '@/animated/spinner.json';
import ErrorText from '@/components/ui/ErrorText';
import FilledButton from '@/components/ui/FilledButton';
import InputField from '@/components/ui/InputField';
import Link from '@/components/ui/Link';
import { EMAIL_PATTERN, SERVER_URL } from '@/config/constants';
import Lottie from 'lottie-react';
import { useState } from 'react';

export default function Page() {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isPending, setIsPending] = useState(false);

    const sendResetEmail = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsPending(true);

        if (!EMAIL_PATTERN.test(email)) {
            setErrorMsg('Enter your proper email address.');
            setIsPending(false);
            return;
        }

        console.log('email:', email);
        await fetch(`${SERVER_URL}/users/forget-password`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email }),
        })
            .then(async (res) => {
                await res.json().then((data) => {
                    if (data.status == 'fail') {
                        setErrorMsg(data.message);
                        return;
                    }
                    console.log(data);
                    window.location.href = '/sent-reset-email';
                });
            })
            .catch(() => {
                setErrorMsg('Could not reset password at this time.');
            })
            .finally(() => setIsPending(false));
    };

    return (
        <section className="mt-8 w-full max-w-lg mx-auto">
            <h1 className="font-black text-center text-3xl text-neutral-900 dark:text-neutral-100">
                Forgot Your Password?
            </h1>
            <p className="text-center font-bold text-base text-neutral-500 dark:text-neutral-300 mt-6">
                We&apos;ll email you a link to reset your password if you
                already have an account with us.
            </p>
            <form className="w-full mt-8">
                <InputField
                    name="reset-email"
                    type="email"
                    id="field-email-address"
                    value={email}
                    placeholder="Email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errorMsg && <ErrorText errorMsg={errorMsg} />}
                <FilledButton
                    text={isPending ? 'Sending Email' : 'Reset Password'}
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
                        e.preventDefault();
                        if (!isPending) {
                            sendResetEmail(e);
                        }
                    }}
                    disabled={isPending}
                />
                <section className="mt-6 mb-6 text-center">
                    <Link
                        underlined={true}
                        href="/signup"
                        text="Sign Up Instead"
                    />
                </section>
            </form>
        </section>
    );
}
