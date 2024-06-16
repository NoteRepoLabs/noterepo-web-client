'use client';

import spinningAnimation from '@/animated/spinner.json';
import ErrorText from '@/components/ui/ErrorText';
import FilledButton from '@/components/ui/FilledButton';
import InputField from '@/components/ui/InputField';
import { SERVER_URL } from '@/config/constants';
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

    // Handles input validation and makes reset password request
    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDisabled(true);

        // Password length cannot be less than 6
        if (password.length < 6 || passwordConfirmation.length < 6) {
            setIsPasswordError(true);
            setErrorMsg('Password should be at least 6 characters long.');
            setIsDisabled(false);
            return;
        }

        // Match new password
        if (password !== passwordConfirmation) {
            setIsPasswordError(true);
            setErrorMsg('Passwords mismatch.');
            setIsDisabled(false);
            return;
        }

        const userID = searchParams.get('userId');

        // Verify that userID is present
        if (!userID) {
            setErrorMsg('Invalid request state.');
            setIsDisabled(false);
            return;
        }

        // Prepare credentials
        const credentials = { password, confirmPassword: passwordConfirmation };
        console.log(credentials);

        // [TODO]: Make mutation requests here
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
                        isDisabled ? 'Resetting Password' : 'Reset My Password'
                    }
                    icon={
                        isDisabled ? (
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
            </form>
        </section>
    );
}
