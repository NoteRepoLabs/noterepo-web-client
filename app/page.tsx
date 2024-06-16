'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardHeader from '@/components/ui/dashboard/DashboardHeader';
import { UserInterface } from '@/types/userTypes';
import { useEffect, useState } from 'react';

export default function Home() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const parsedUser: UserInterface = JSON.parse(
            localStorage.getItem('user') ?? '{}'
        );
        setUser(parsedUser);
    }, [user]);

    return (
        <ProtectedRoute>
            <section className="mt-8 w-full max-w-3xl h-full mx-auto">
                <DashboardHeader />
            </section>
        </ProtectedRoute>
    );
}
