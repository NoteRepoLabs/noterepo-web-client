/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

interface ContainerProps {
    children: React.ReactNode;
}

/**
 * Responsible for providing a container layout
 * @returns a container component
 */
export default function Container({ children }: ContainerProps) {
    return (
        <main className="w-full max-w-screen-md mx-auto px-2">
            {children}
        </main>
    );
}
