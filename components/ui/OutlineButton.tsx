/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import clsx from 'clsx';

interface OutlineButtonProps {
    text: string;
    styles?: React.CSSProperties;
    icon?: React.ReactElement | null;
    disabled?: boolean;
    tinyText?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/* Outline button components */
export default function OutlineButton({
    text,
    onClick,
    icon,
    disabled,
    tinyText,
    styles,
}: OutlineButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`max-w-lg w-[100%] flex justify-center items-center font-bold text-lg border-2 border-neutral-300 text-neutral-500 md:px-3 md:py-4 py-2 rounded-xl md:rounded-2xl mx-auto  dark:border-highlight dark:text-neutral-300  transition-colors disabled:!opacity-70 ${
                !disabled
                    ? 'hover:border-neutral-800 dark:hover:border-neutral-200'
                    : ''
            }`}
            style={{ ...styles }}
        >
            {icon && <div className="w-8 max-w-8 h-8 max-h-8">{icon}</div>}
            <span className={clsx(tinyText ? '!text-base' : '')}>{text}</span>
        </button>
    );
}
