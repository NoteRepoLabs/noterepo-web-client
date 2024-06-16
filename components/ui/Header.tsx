'use client';

import Logo from './Logo';

interface HeaderProps {
    content: string;
    aside: string;
}

export default function Header({ content, aside }: HeaderProps) {
    return (
        <>
            <div className="flex justify-center items-center">
                <Logo width={200} height={80} />
                <h3 className="text-3xl ml-2 hidden md:block">| {aside}</h3>
            </div>
            <p
                className={`mt-2 text-center font-semibold text-base md:text-lg text-neutral-500 dark:text-neutral-300`}
            >
                {content}
            </p>
        </>
    );
}
