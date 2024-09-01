/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface LogoProps {
    width: number;
    height: number;
}

/** Logo component */
export default function Logo(props: LogoProps) {
    const light = '/img/NoteRepoLight.svg';
    const dark = '/img/NoteRepoDark.svg';

    const { resolvedTheme } = useTheme();
    const [fallBackTheme, setFallBackTheme] = useState(dark);

    // Load initial theme
    useEffect(() => {
        setFallBackTheme(resolvedTheme == 'dark' ? dark : light);
    }, [resolvedTheme]);

    return (
        <div onClick={() => (window.location.href = '/')}>
            <Image
                src={fallBackTheme}
                alt="Logo"
                width={props.width}
                height={props.height}
                priority={true}
                className="select-none cursor-pointer"
            />
        </div>
    );
}
