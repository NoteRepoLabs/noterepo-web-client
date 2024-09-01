/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * Responsible for providing the global query client
 * @param children JSX child elements
 * @returns void
 */
export default function QueryProvider({ children }: React.PropsWithChildren) {
    const [qClient] = useState(new QueryClient());

    return (
        <QueryClientProvider client={qClient}>{children}</QueryClientProvider>
    );
}
