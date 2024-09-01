/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import Lottie from 'lottie-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import lightAnimData from '@/animated/email-dark.json';
import darkAnimData from '@/animated/email-light.json';
import CenteredGridLayout from '@/layout/CenteredGridLayout';

/**
 * UI prompting the user to check their inbox for a reset link.
 * @returns a verify email component
 */
export default function Page() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [fallback, setFallback] = useState(lightAnimData);

    useEffect(() => {
        setMounted(true);
        setFallback(resolvedTheme == 'dark' ? darkAnimData : lightAnimData);
    }, [resolvedTheme]);

    console.log(resolvedTheme);

    return (
        <>
            {mounted && (
                <CenteredGridLayout>
                    <section className="mt-8 w-full max-w-lg mx-auto text-center">
                        <div className="w-[164px] h-[96px] inline-block">
                            <Lottie
                                animationData={fallback}
                                loop={true}
                                autoplay={true}
                                rendererSettings={{
                                    preserveAspectRatio: 'xMidYMid slice',
                                }}
                            />
                        </div>
                        <h1 className="font-bold text-3xl mt-12 mb-6 text-neutral-900 dark:text-neutral-100">
                            Verify Your Email
                        </h1>
                        <p className="text-center text-base text-neutral-500 dark:text-neutral-300 mb-12">
                            We&apos;ve sent you a link to verify your email
                            address. Please check your inbox.
                        </p>
                    </section>
                </CenteredGridLayout>
            )}
        </>
    );
}
