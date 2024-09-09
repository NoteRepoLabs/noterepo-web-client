/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

import CloseCircleIcon from '../ui/CloseCircleIcon';
import Modal from '../ui/Modal';

interface ShareRepoDialogProps {
    onClick: () => void;
}

/* Delete Repo Dialog Component */
export default function ShareRepoDialog(props: ShareRepoDialogProps) {
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
            </Modal>
        </>
    );
}
