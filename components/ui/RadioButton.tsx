/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import clsx from 'clsx';

interface RadioButtonProps {
    label: string;
    isSelected: boolean;
    onClick: () => void;
}

export default function RadioButton(props: RadioButtonProps) {
    return (
        <>
            <div
                className="flex gap-2 items-center cursor-pointer group select-none"
                onClick={props.onClick}
            >
                <div
                    className={clsx(
                        'w-4 h-4 border-2 dark:border-neutral-500 border-neutral-300 rounded-xl relative',
                        props.isSelected
                            ? '!border-vibrant-green'
                            : 'dark:border-highlight border-neutral-300'
                    )}
                >
                    <div
                        className={clsx(
                            'w-[6px] h-[6px] dark:bg-transparent rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                            props.isSelected
                                ? '!bg-vibrant-green'
                                : 'bg-transparent'
                        )}
                    />
                </div>
                <span
                    className={clsx(
                        'group-hover:dark:!text-neutral-200 transition-colors',
                        props.isSelected
                            ? 'dark:text-neutral-200 text-neutral-900'
                            : 'text-neutral-300'
                    )}
                >
                    {props.label}
                </span>
            </div>
        </>
    );
}
