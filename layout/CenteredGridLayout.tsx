/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import React from 'react';

interface CenteredGridProps {
    children: React.ReactNode;
}

/**
 * Responsible for providing a flexible, screen centered layout.
 * @returns a centered grid component
 */
export default function CenteredGridLayout({ children }: CenteredGridProps) {
    return <main className="grid place-items-center h-screen p-2">{children}</main>;
}
