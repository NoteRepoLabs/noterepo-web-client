/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import Overlay from './Overlay';

interface ModalProps {
    children: React.ReactNode;
}

/**
 * Responsible for handling modal UI.
 * @param props modal children passed through here.
 * @returns a modal component.
 */
export default function Modal(props: ModalProps) {
    return (
        <section className="w-full h-screen grid place-items-center fixed top-0 left-0 z-[20]">
            <Overlay />
            <section className="w-[90%] mt-12 mx-auto max-w-lg px-4 py-8 bg-neutral-100 border-[1px] border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 z-[1000] flex flex-col justify-center rounded-xl items-center text-center shadow-lg relative">
                {props.children}
            </section>
        </section>
    );
}
