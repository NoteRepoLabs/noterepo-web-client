'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardHeader from '@/components/ui/dashboard/DashboardHeader';
// import getUsers from '@/queries/getUsers';
// import { useQuery } from '@tanstack/react-query';

export default function Home() {
    // const { isPending, data } = useQuery({
    //     queryKey: ['getUsers'],
    //     queryFn: getUsers,
    //     staleTime: Infinity,
    // });

    return (
        <ProtectedRoute>
            <section className="mt-8 w-full max-w-3xl h-full mx-auto">
                <DashboardHeader />
            </section>
        </ProtectedRoute>
    );
}
