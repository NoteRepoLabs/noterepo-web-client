/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import clsx from 'clsx';
import { Tick02Icon } from 'hugeicons-react';

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
            className="flex items-center gap-2 cursor-pointer transition-all active:scale-90 scale-100 select-none"
            onClick={props.onClick}
        >
            <div
                className={clsx(
                    'relative w-4 h-4 border-2 border-highlight rounded-sm',
                    props.checked ? 'border-vibrant-green bg-vibrant-green' : ''
                )}
            >
                {props.checked && (
                    <Tick02Icon
                        size={16}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                )}
            </div>
            <span
                className={clsx(
                    'opacity-70 hover:opacity-100 transition-opacity',
                    props.checked ? '!opacity-100' : ''
                )}
            >
                {props.label}
            </span>
        </div>
    );
}
