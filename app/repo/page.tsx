'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import SpinnerText from '@/components/ui/SpinnerText';
import { SERVER_URL } from '@/config/constants';
import Repo from '@/types/repoTypes';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { ArrowLeft02Icon } from 'hugeicons-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/* Repo page component */
export default function Page() {
    const searchParams = useSearchParams();
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [repo, setRepo] = useState<Repo | null>(null);

    const fetchRepoContent = async () => {
        setErrorMsg('');
        const repoID = searchParams.get('repo');

        if (!localStorage.getItem('repos')) {
            try {
                const userID = searchParams.get('user');

                if (!userID || !repoID) {
                    setErrorMsg('Bad state, URL is malformed.');
                    setLoading(false);
                    return;
                }

                const refreshToken = getCookie('refreshToken');

                // Get the access token
                const tokenResponse = await axios.get(
                    `${SERVER_URL}/auth/refreshToken/${userID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );

                const accessToken = tokenResponse.data.payload['access_token'];

                // Fetch repo content
                const response = await axios.get(
                    `${SERVER_URL}/users/${userID}/repo/${repoID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                console.log(response.data['payload']);
                setRepo(response.data['payload']);
                setLoading(false);
            } catch (error) {
                console.error('Failed to get repo content:', error);
                setErrorMsg(
                    'Failed to get repo content. Check your connection.'
                );
                setLoading(false);
            }
        } else {
            const allRepos: Repo[] = JSON.parse(localStorage.getItem('repos')!);
            const thisRepo: Repo = allRepos.filter((repo) => repo.id == repoID)[0];
            setRepo(thisRepo);
            setLoading(false);
        }
    };

    // Fetch on load
    useEffect(() => {
        fetchRepoContent();
    }, []);

    return (
        <ProtectedRoute>
            <section className="mt-8 w-full max-w-3xl min-h-[90%] mx-auto">
                <header className="cursor-pointer text-neutral-300 hover:text-neutral-200 transition-colors">
                    <a href="/" className="flex gap-2 items-center">
                        <ArrowLeft02Icon />
                        <span>Back</span>
                    </a>
                </header>
                {loading ? (
                    <section className="w-full grid place-items-center">
                        <SpinnerText text="Getting files." />
                    </section>
                ) : errorMsg ? (
                    <section className="w-full grid place-items-center mt-8">
                        <h3 className="font-bold text-neutral-300 text-xl">
                            {errorMsg}
                        </h3>
                    </section>
                ) : (
                    repo && (
                        <main className="mt-8">
                            <div className="text-center">
                                <h2 className="font-bold text-3xl">
                                    {repo.name}
                                </h2>
                                <p className="text-base mt-4 text-neutral-300">
                                    {repo.description}
                                </p>
                            </div>
                        </main>
                    )
                )}
            </section>
        </ProtectedRoute>
    );
}
