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

    if (loading) return <LoadingSpinner />;
    if (!isAuthenticated) return <></>;

    return <>{children}</>;
}
