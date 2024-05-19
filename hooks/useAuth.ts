'use client';

import { getCookie, hasCookie } from 'cookies-next';
import Router from 'next/router';
import { useEffect, useState } from 'react';

export const checkSession = () => {
    return hasCookie('authtoken');
};

// Checks auth status of the user
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const signedIn = checkSession();

            setIsAuthenticated(signedIn);
            setLoading(false);
        };

        verifyUser();
    }, []);

    return { isAuthenticated, loading };
};
