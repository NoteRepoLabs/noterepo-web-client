/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import META from '@/shared/meta';
import { useState } from 'react';
import CloseCircleIcon from '../ui/CloseCircleIcon';
import Modal from '../ui/Modal';

interface ShareRepoDialogProps {
    onClick: () => void;
    repoID: string;
}

/* Delete Repo Dialog Component */
export default function ShareRepoDialog(props: ShareRepoDialogProps) {
    const sharingLink = `${META.baseURL}/share?id=${props.repoID}`;
    const [showCopiedText, setShowCopiedText] = useState(false);

    // Write to the clipboard using the navigator
    const handleCopyEvent = () => {
        navigator.clipboard.writeText(sharingLink);
        setShowCopiedText(true);
        setTimeout(() => {
            setShowCopiedText(false);
            // close modal after copying?
            // setTimeout(() => {
            //     props.onClick();
            // }, 500);
        }, 500);
    };

    return (
        <>
            <Modal>
                <CloseCircleIcon onClick={props.onClick} />
                <h3 className="text-2xl font-bold text-center dark:text-neutral-100 text-neutral-700">
                    Share this Repo
                </h3>
                <p className="my-2 px-2 text-neutral-500 dark:text-neutral-300">
                    Copy this link to share your repo with anyone!
                </p>
                <section className="flex flex-col md:flex-row gap-2 mt-4 px-2 max-w-[280px] sm:max-w-md">
                    <div
                        className="dark:bg-neutral-700 w-full border-neutral-300 dark:border-highlight border-2 rounded-md p-2 overflow-x-scroll !h-[44px] whitespace-nowrap"
                        id="no-scroll"
                    >
                        <span>{sharingLink}</span>
                    </div>
                    <button
                        className="flex-grow bg-vibrant-green rounded-lg text-neutral-900 font-bold hover:opacity-80 transition-all active:scale-95 px-3 py-2 md:py-0"
                        onClick={handleCopyEvent}
                    >
                        <span>Copy</span>
                    </button>
                </section>
                {showCopiedText && (
                    <h4 className="text-vibrant-green font-bold text-sm mt-2">
                        Copied!
                    </h4>
                )}
                <p className="text-neutral-500 dark:text-neutral-300 font-bold text-xs mt-6 px-2">
                    Anything you&apos;ve uploaded will be publicly viewable.
                </p>
            </Modal>
        </>
    );
}
