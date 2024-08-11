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
                <h3 className="text-3xl ml-2 hidden md:block"><span className="opacity-70">| {aside}</span></h3>
            </div>
            <p
                className={`mt-8 text-center font-normal text-lg text-neutral-500 dark:text-neutral-300 leading-[26px]`}
            >
                {content}
            </p>
        </>
    );
}
