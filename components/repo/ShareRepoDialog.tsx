/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import META from '@/shared/meta';
import CloseCircleIcon from '../ui/CloseCircleIcon';
import Modal from '../ui/Modal';

interface ShareRepoDialogProps {
    onClick: () => void;
    repoID: string;
}

/* Delete Repo Dialog Component */
export default function ShareRepoDialog(props: ShareRepoDialogProps) {
    const sharingLink = `${META.baseURL}/share?id=${props.repoID}`;

    return (
        <>
            <Modal>
                <CloseCircleIcon onClick={props.onClick} />
                <h3 className="text-2xl font-bold text-center dark:text-neutral-100 text-neutral-700">
                    Share this Repo
                </h3>
                <p className="my-2 px-2 text-neutral-500 dark:text-neutral-300">
                    Copy this link to share your repo with anyone! Note that
                    anything you&apos;ve uploaded will be publicly viewable.
                </p>
                <section className="flex gap-2 mt-4">
                    <div
                        className="w-[80%] dark:bg-neutral-700 max-w-md border-highlight border-2 rounded-md p-2 overflow-x-scroll !h-[48px] whitespace-nowrap"
                        id="no-scroll"
                    >
                        <span>{sharingLink}</span>
                    </div>
                    <button
                        className="flex-grow bg-vibrant-green rounded-lg text-neutral-900 font-bold"
                        onClick={() => {
                            navigator.clipboard.writeText(sharingLink);
                        }}
                    >
                        <span>Copy</span>
                    </button>
                </section>
            </Modal>
        </>
    );
}
