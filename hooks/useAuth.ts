'use client';

import { hasCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

// Checks if refresh token exists
export const checkSession = () => {
    return hasCookie('refresh-token');
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
