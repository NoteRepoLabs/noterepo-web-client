'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardView from '@/components/dashboard/DashboardView';
import { UserInterface } from '@/types/userTypes';
import { useEffect, useState } from 'react';

export default function Home() {
    const [user, setUser] = useState<UserInterface>({
        username: '',
        id: '',
        email: '',
        isVerified: false,
        role: '',
        search_token: '',
    });

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
                <DashboardView />
            </section>
        </ProtectedRoute>
    );
}
