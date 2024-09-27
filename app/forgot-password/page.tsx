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
import Link from '@/components/ui/Link';
import { EMAIL_PATTERN, SERVER_URL } from '@/config/constants';
import NetworkConfig from '@/config/network';
import CenteredGridLayout from '@/layout/CenteredGridLayout';
import { EmailCredentials } from '@/types/authTypes';
import ServerResponse from '@/types/serverTypes';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Lottie from 'lottie-react';
import { useState } from 'react';

/**
 * Provides an interface for the user to reset their password.
 * @returns a forgot password page component
 */
export default function Page() {
  // Page state
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  /**
   * Mutation query for sending password reset emails.
   * On success: Redirect the user to the sent email page.
   * On failure: Display an error message explaining what went wrong.
   */
  const forgotPasswordMutation = useMutation({
    mutationFn: (email: EmailCredentials) => {
      return axios.post(`${SERVER_URL}/users/forget-password`, email, {
        headers: NetworkConfig.headers,
      });
    },
    onSuccess: () => {
      window.location.href = '/sent-reset-email';
    },
    onError: (err: AxiosError) => {
      console.error('An error occurred.', err);
      const serverErr = err.response?.data as ServerResponse;

      err.code == 'ERR_NETWORK'
        ? showErrorState('Could not sign up, check your connection.')
        : showErrorState(serverErr.message ?? 'An error occurred.');
    },
  });

  // Error related state
  const showErrorState = (msg: string) => {
    setErrorMsg(msg);
    setIsDisabled(false);
  };

  /**
   * Checks that the email provided is valid and proceeds to make
   * a password reset request to the server.
   * @param e React form event (button)
   * @returns void
   */
  const sendResetEmail = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDisabled(true);

    // Verify that email matches default pattern
    if (!EMAIL_PATTERN.test(email)) {
      showErrorState('Enter your proper email address.');
      return;
    }

    // Make mutation request
    forgotPasswordMutation.mutate({ email: email });
    setIsDisabled(false);
  };

  return (
    <CenteredGridLayout>
      <section className="mt-8 w-full max-w-lg mx-auto">
        <h1 className="font-bold text-center text-3xl text-neutral-900 dark:text-neutral-100">
          Forgot Your Password?
        </h1>
        <p className="text-center text-base text-neutral-500 dark:text-neutral-300 mt-6">
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
            text={
              forgotPasswordMutation.isPending
                ? 'Sending Email'
                : 'Reset Password'
            }
            icon={
              forgotPasswordMutation.isPending ? (
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
              if (
                !forgotPasswordMutation.isPending ||
                !isDisabled
              ) {
                sendResetEmail(e);
              }
            }}
            disabled={forgotPasswordMutation.isPending}
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
    </CenteredGridLayout>
  );
}
