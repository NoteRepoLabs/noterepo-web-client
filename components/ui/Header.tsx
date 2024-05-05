'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HeaderProps {
    content: string;
    aside: string;
}

const logoSrcLight = '/img/NoteRepoLight.svg';
const logoSrcDark = '/img/NoteRepoDark.svg';

export default function Header({ content, aside }: HeaderProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [fallBackTheme, setFallBackTheme] = useState(logoSrcLight);
    useEffect(() => {
        setMounted(true);
        setFallBackTheme(resolvedTheme == 'dark' ? logoSrcDark : logoSrcLight);
    }, [resolvedTheme]);

    return (
        <>
            {mounted && (
                <div className="flex md:flex-row flex-col  items-center">
                    <Image
                        src={fallBackTheme}
                        alt="Logo"
                        width={200}
                        height={80}
                        className="md:w-[240px] md:h-[80px] select-none"
                    />
                    <h3 className="text-3xl ml-2 hidden md:block">| {aside}</h3>
                </div>
            )}
            <p
                className={`mt-4 text-center font-semibold text-base md:text-lg text-neutral-500 dark:text-neutral-300`}
            >
                {content}
            </p>
        </>
    );
}
