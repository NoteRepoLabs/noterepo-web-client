/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import clsx from 'clsx';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onClick: () => void;
}

/**
 * Checkbox UI component.
 * @returns a checkbox UI component.
 */
export default function Checkbox(props: CheckboxProps) {
    return (
        <div
            className="flex items-center gap-2 cursor-pointer transition-all active:scale-95 scale-100 select-none"
            onClick={props.onClick}
        >
            <div
                className={clsx(
                    'relative w-4 h-4 border-2 border-highlight rounded-sm',
                    props.checked ? 'border-vibrant-green bg-vibrant-green' : ''
                )}
            >
                {props.checked && (
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                )}
            </div>
            <span
                className={clsx(
                    'opacity-80 hover:opacity-100 transition-opacity',
                    props.checked ? '!opacity-100' : ''
                )}
            >
                {props.label}
            </span>
        </div>
    );
}
