/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

interface BottomBorderContainerProps {
    children: React.ReactNode;
}

/**
 * Responsible for providing a bottom border container layout
 * @returns a bottom border container component
 */
export default function BottomBorderContainer({ children }: BottomBorderContainerProps) {
    return (
        <section className="w-full max-w-screen-md mx-auto px-2 border-b dark:border-highlight">
            {children}
        </section>
    );
}
