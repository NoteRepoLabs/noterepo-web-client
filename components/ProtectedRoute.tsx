/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import { useAuth } from '@/hooks/useAuth';
import React, { ReactNode, useEffect } from 'react';
import LoadingSpinner from './ui/LoadingSpinner';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps): JSX.Element {
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) window.location.href = '/signup';
    }, [loading, isAuthenticated]);

    if (loading)
        return (
            <section className="w-screen h-screen grid place-items-center">
                <LoadingSpinner />
            </section>
        );
    if (!isAuthenticated) return <></>;

    return <>{children}</>;
}
