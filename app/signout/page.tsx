/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import CenteredGridLayout from '@/layout/CenteredGridLayout';
import { deleteCookie } from 'cookies-next';
import { useEffect } from 'react';

/**
 * Clears all the users credentials from cookies and local storage,
 * then redirects to sign in.
 * @returns a signout page component.
 */
export default function Page() {
    useEffect(() => {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('repos');

        console.log('Deleted storage and cookies successfully.');
        window.location.href = '/signin';
    }, []);

    return (
        <>
            <CenteredGridLayout>
                <section className="w-full max-w-lg mx-auto text-center">
                    <h1 className="font-bold text-3xl mb-6 text-neutral-900 dark:text-neutral-100">
                        Signing Out
                    </h1>
                    <p className="text-center text-base text-neutral-500 dark:text-neutral-300 mb-12">
                        We&apos;s signing you out of your account, hope to see
                        you soon.
                    </p>
                </section>
            </CenteredGridLayout>
        </>
    );
}
