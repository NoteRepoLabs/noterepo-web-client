/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import { hasCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

/**
 * Returns the auth status of the user.
 * @returns true if the refresh token and user instance is present.
 */
export const checkSession = () => {
    return hasCookie('refreshToken') && localStorage.getItem('user') != null;
};

/**
 * Responsible for providing the user's auth status to the
 * user interface.
 * @returns authentication and loading status.
 */
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
