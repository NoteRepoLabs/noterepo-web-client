'use client';

import { deleteCookie } from 'cookies-next';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        localStorage.removeItem('user');

        console.log('Deleted cookies successfully.');
        window.location.href = '/signup';
    }, []);

    return (
        <>
            <section className="mt-8 w-full max-w-lg mx-auto text-center">
                <h1 className="font-black text-3xl mb-6 text-neutral-900 dark:text-neutral-100">
                    Sign Out
                </h1>
                <p className="text-center font-bold text-base text-neutral-500 dark:text-neutral-300 mb-12">
                    We&apos;s signing you out of your account, hope to see you
                    soon.
                </p>
            </section>
        </>
    );
}
