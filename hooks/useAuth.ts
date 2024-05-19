'use client';

import { SERVER_URL } from '@/config/constants';
import Router from 'next/router';
import { useEffect, useState } from 'react';

const checkSession = async (): Promise<boolean> => {
    try {
        const res = await fetch(`${SERVER_URL}/users`, {
            credentials: 'include',
        });

        return res.ok;
    } catch {
        return false;
    }
};

// Checks auth status of the user
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const signedIn = await checkSession();
            setIsAuthenticated(signedIn);
            setLoading(false);

            if (!signedIn) {
                Router.push('/signup');
            }
        };

        verifyUser();
    }, []);

    return { isAuthenticated, loading };
};
