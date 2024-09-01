/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from '@/components/ui/Link';
import Lottie from 'lottie-react';

import lightAnimData from '@/animated/email-dark.json';
import darkAnimData from '@/animated/email-light.json';
import CenteredGridLayout from '@/layout/CenteredGridLayout';

/**
 * The user is redirected here when their password reset
 * email has been sent.
 * @returns a reset email page component.
 */
export default function Page() {
    const { resolvedTheme } = useTheme();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [fallback, setFallback] = useState(lightAnimData);

    useEffect(() => {
        setMounted(true);
        setFallback(resolvedTheme == 'dark' ? darkAnimData : lightAnimData);
    }, [resolvedTheme]);

    return (
        <>
            {mounted && (
                <CenteredGridLayout>
                    <section className="w-full max-w-lg mx-auto text-center">
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

                        <h1 className="font-bold text-2xl md:text-3xl mt-12 text-neutral-900 dark:text-neutral-100">
                            We&apos;ve Emailed You a Link
                        </h1>
                        <p className="text-center text-base text-neutral-500 dark:text-neutral-300 mt-4">
                            A link has been sent to reset your password. Please
                            check your inbox.
                        </p>
                        <p className="mt-8">
                            <span className="font-bold text-neutral-500 dark:text-neutral-300">
                                Didn&apos;t get an email?{' '}
                            </span>
                            <Link
                                underlined={true}
                                href=""
                                text="Resend link"
                                style={{ marginRight: '12px' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/forgot-password');
                                }}
                            />
                        </p>
                    </section>
                </CenteredGridLayout>
            )}
        </>
    );
}
