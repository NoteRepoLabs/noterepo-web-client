/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import clsx from 'clsx';

export interface IconTextProps {
    text: string;
    icon: React.ReactElement | null;
    styles?: React.CSSProperties;
    hideText?: boolean;
    classStyle?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

/** Icon text component */
export default function IconText(props: IconTextProps) {
    return (
        <>
            <div
                className={clsx(
                    'inline-flex items-center cursor-pointer space-x-2 select-none dark:text-neutral-300 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200',
                    props.classStyle
                )}
                style={{ ...props.styles }}
                onClick={props.onClick}
            >
                <div>{props.icon}</div>
                {!props.hideText && (
                    <span className="font-normal transition-colors text-md">
                        {props.text}
                    </span>
                )}
            </div>
        </>
    );
}
