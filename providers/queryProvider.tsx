'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * Global app query provider
 * @param children JSX child elements
 * @returns void
 */
export default function QueryProvider({ children }: React.PropsWithChildren) {
    const [qClient] = useState(new QueryClient());

    return (
        <QueryClientProvider client={qClient}>{children}</QueryClientProvider>
    );
}
