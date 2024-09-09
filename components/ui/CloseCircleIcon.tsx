/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import { CloseCircle } from 'iconsax-react';

interface CloseCircleProps {
    onClick: () => void;
}

/* Close Circle Component */
export default function CloseCircleIcon(props: CloseCircleProps) {
    return (
        <CloseCircle
            size="24"
            variant="Bold"
            className="text-neutral-300 cursor-pointer absolute top-2 left-2 transition-colors hover:text-neutral-500 dark:hover:text-neutral-100"
            onClick={props.onClick}
        />
    );
}
