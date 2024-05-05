import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ThemeProvider from './provider';
import { cookies } from 'next/headers';

// Analytics
import { Analytics } from '@vercel/analytics/react';

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

const satoshi = localFont({
    src: [
        { path: '../public/fonts/satoshi/Satoshi-Black.woff', weight: '900' },
        { path: '../public/fonts/satoshi/Satoshi-Bold.woff', weight: '800' },
        { path: '../public/fonts/satoshi/Satoshi-Medium.woff', weight: '700' },
        {
            path: '../public/fonts/satoshi/Satoshi-Regular.woff',
            weight: '600',
        },
        { path: '../public/fonts/satoshi/Satoshi-Light.woff', weight: '500' },
    ],
    variable: '--font-satoshi',
});

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
                className={`${satoshi.variable} font-sans flex flex-col justify-center items-center`}
            >
                <Analytics />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
