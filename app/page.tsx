'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { SERVER_URL } from '@/config/constants';
import { useEffect } from 'react';

export default function Home() {
    const fetchUsers = async () => {
        const res = await fetch(`${SERVER_URL}/users`, {
            credentials: 'include',
        });
        const data = await res.json();
        console.log(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <ProtectedRoute>
            <section className="mt-8 w-full max-w-lg mx-auto text-center">
                <h1 className="font-black text-3xl mb-6 text-neutral-900 dark:text-neutral-100">
                    Welcome Home
                </h1>
                <p className="text-center font-bold text-base text-neutral-500 dark:text-neutral-300 mb-12">
                    You&apos;ve successfully setup your NoteRepo account.
                </p>
            </section>
        </ProtectedRoute>
    );
}
