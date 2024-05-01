'use client';

import Link from '@/components/ui/Link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';

export default function Page() {
    const router = useRouter();

    return (
        <section className="max-w-2xl md:my-8 mx-3 md:mx-auto flex flex-col justify-center items-center min-h-screen text-center">
            <Image src="/icon/icon-email.svg" alt="" width={64} height={64} />
            <h1 className="font-black text-2xl md:text-3xl mt-12 text-neutral-900 dark:text-neutral-100">
                We&apos;ve Emailed You a Link
            </h1>
            <p className="text-center font-bold text-base text-neutral-500 dark:text-neutral-300 mt-4">
                A link has been sent to reset your password. Please check your
                inbox.
            </p>
            <p className="mt-8">
                <span className="font-semibold text-neutral-500 dark:text-neutral-300">
                    Didn&apos;t get an email?{' '}
                </span>
                <Link
                    underlined={true}
                    href=""
                    text="Resend Link"
                    style={{ marginRight: '12px' }}
                    onClick={(e) => {
                        e.preventDefault();
                        router.push('/forgot-password');
                    }}
                />
            </p>
        </section>
    );
}
