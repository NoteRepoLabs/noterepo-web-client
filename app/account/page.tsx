/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import BioField from '@/components/account/BioField';
import FilledButton from '@/components/ui/FilledButton';
import BottomBorderContainer from '@/layout/BottomBorderContainer';
import Container from '@/layout/Container';
import shared from '@/shared/constants';
import { IUser } from '@/types/userTypes';
import { decrypt } from '@/util/encryption';
import { ArrowLeft02Icon } from 'hugeicons-react';

export default function Page() {
    const loggedInUser = localStorage.getItem(shared.keys.USER);
    if (!loggedInUser) {
        window.location.href = '/signout';
    }

    const currentUser: IUser = decrypt(loggedInUser);

    return (
        <ProtectedRoute>
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

                <BottomBorderContainer>
                    <div className="py-4">
                        <h3 className="text-xl mb-1 font-bold">Personal</h3>
                        <p className="dark:text-neutral-300 text-neutral-500 mb-2">
                            Username:{' '}
                            <span className="dark:text-neutral-200">
                                {currentUser.username}
                            </span>
                        </p>
                        <p className="dark:text-neutral-300 text-neutral-500 mb-2">
                            Bio:
                        </p>
                        <BioField bio={currentUser.bio} />
                        <FilledButton
                            text="Update"
                            onClick={() => {}}
                            className="w-full m-0 md:!max-w-[120px] md:ml-0 mt-2 !py-2 !rounded-md"
                        />
                    </div>
                </BottomBorderContainer>
            </Container>
        </ProtectedRoute>
    );
}
