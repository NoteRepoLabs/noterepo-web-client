/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import Container from '@/layout/Container';
import { ArrowLeft02Icon } from 'hugeicons-react';

export default function Page() {
    return (
        <>
            <Container>
                <a
                    href="/"
                    className="flex gap-2 items-center px-2 md:px-0 mt-2 opacity-80 hover:opacity-100 transition-opacity"
                >
                    <ArrowLeft02Icon />
                    <span>Back</span>
                </a>
                <header className="mt-2 py-2 border-b dark:border-b-highlight border-neutral-300 mb-2">
                    <h1 className="text-3xl mb-2 font-bold">My Account</h1>
                </header>
            </Container>
        </>
    );
}
