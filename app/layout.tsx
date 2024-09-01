/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import QueryProvider from '@/providers/queryProvider';
import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import ThemeProvider from './provider';

// Analytics
import { Analytics } from '@vercel/analytics/react';

// Open Graph Config
export const metadata: Metadata = {
    title: 'NoteRepo',
    description:
        'A collaborative effort to make sharing lecture materials easier.',
    icons: {
        shortcut: '/shortcut-icon.svg',
    },
    openGraph: {
        title: 'NoteRepo',
        description:
            'A collaborative effort to make sharing lecture materials easier.',
        url: 'https://www.noterepo.com.ng',
        locale: 'en_US',
        type: 'website',
        images: {
            url: 'https://www.noterepo.com.ng/opengraph.png',
            width: 1200,
            height: 640,
        },
    },
    metadataBase: new URL('https://www.noterepo.com.ng'),
};

const sans = Roboto_Flex({ subsets: ['latin'] });

// Theme controller
function getTheme() {
    const cookieStore = cookies();
    const themeCookie = cookieStore.get('theme');
    const theme = themeCookie ? themeCookie.value : 'dark';
    return theme;
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const theme = getTheme() as string;

    return (
        <html lang="en" className={theme} style={{ colorScheme: theme }}>
            <body
                className={sans.className}
            >
                <Analytics />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <QueryProvider>{children}</QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
