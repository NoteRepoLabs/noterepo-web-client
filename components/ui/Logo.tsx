'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/** Logo props interface */
export interface LogoProps {
    width: number;
    height: number;
}

/** Logo component */
export default function Logo(props: LogoProps) {
    const light = '/img/NoteRepoLight.svg';
    const dark = '/img/NoteRepoDark.svg';
    const { resolvedTheme } = useTheme();
    const [fallBackTheme, setFallBackTheme] = useState(light);

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
