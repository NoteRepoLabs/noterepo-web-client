/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardView from '@/components/dashboard/DashboardView';
import { UserInterface } from '@/types/userTypes';
import { useEffect, useState } from 'react';

const DefaultUserState = {
    username: '',
    id: '',
    email: '',
    isVerified: false,
    role: '',
    search_token: '',
};

/**
 * Responsible for parsing saved user details and rendering the
 * dashboard.
 * @returns a home (dashboard) component.
 */
export default function Home() {
    const [user, setUser] = useState<UserInterface>(DefaultUserState);

    useEffect(() => {
        const parsedUser: UserInterface = JSON.parse(
            localStorage.getItem('user') ?? '{}'
        );
        setUser(parsedUser);
    }, []);

    return (
        <ProtectedRoute>
            <section className="mt-8 w-full max-w-3xl h-full mx-auto">
                <DashboardHeader username={user.username} />
                <DashboardView user={user} />
            </section>
        </ProtectedRoute>
    );
}
