/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import clsx from 'clsx';

interface FilledButtonProps {
    text: string;
    styles?: React.CSSProperties;
    icon?: React.ReactElement | null;
    disabled?: boolean;
    tinyText?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FilledButton({
    text,
    onClick,
    icon,
    disabled,
    tinyText,
    styles,
}: FilledButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`max-w-lg w-[100%] flex justify-center border-2 items-center font-bold text-lg bg-neutral-900 text-neutral-200 md:px-3 md:py-4 py-3 rounded-xl md:rounded-2xl mx-auto  dark:bg-neutral-100 dark:text-neutral-900  transition-colors disabled:!opacity-70 ${
                !disabled
                    ? 'hover:bg-neutral-800 dark:hover:bg-neutral-200'
                    : ''
            }`}
            style={{ ...styles }}
        >
            {icon && <div className="w-8 max-w-8 h-8 max-h-8">{icon}</div>}
            <span className={clsx(tinyText ? '!text-base' : '')}>{text}</span>
        </button>
    );
}
