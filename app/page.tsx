'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import getUsers from '@/queries/getUsers';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
    const { isPending, data } = useQuery({
        queryKey: ['getUsers'],
        queryFn: getUsers,
        staleTime: Infinity,
    });

    console.log('Users', data);

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
