/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import Repo from '@/types/repoTypes';
import clsx from 'clsx';
import { ArrowDown01Icon } from 'hugeicons-react';
import { FolderOpen } from 'iconsax-react';
import { useState } from 'react';

interface RepoItemCardProps {
    userID: string;
    repoID: string;
    repo: Repo;
}

/**
 * Responsible for showing information on a repo, developed as a
 * replacement for the current box-view card component.
 * @returns a repo item card component
 */
export default function RepoItemCard(props: RepoItemCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            className={clsx(
                'overflow-hidden transition-all',
                isExpanded ? 'h-[200px]' : 'h-[44px]'
            )}
        >
            <header
                className={clsx(
                    'flex items-center justify-between dark:hover:bg-mod-700 p-2 rounded-lg cursor-pointer transition-all hover:scale-[.98] select-none group dark:bg-neutral-900',
                    isExpanded ? 'dark:!bg-mod-700 !scale-100' : ''
                )}
                onClick={toggleExpanded}
            >
                <section className="flex items-center gap-2">
                    <FolderOpen variant="Bulk" size={24} />
                    <h3>
                        <a
                            href={`/repo?user=${props.userID}&repo=${props.repoID}`}
                            rel="noopener noreferrer"
                            title={`${props.repo.name}`}
                            className={clsx(
                                'text-lg opacity-70 hover:opacity-100 transition-colors',
                                isExpanded ? '!opacity-100' : 'opacity-70'
                            )}
                        >
                            {props.repo.name}
                        </a>
                    </h3>
                </section>
                <ArrowDown01Icon
                    className={clsx(
                        'opacity-80 hidden group-hover:block cursor-pointer',
                        isExpanded ? 'rotate-180 !block' : 'rotate-0'
                    )}
                />
            </header>

            <section
                className={clsx(
                    'mt-[2px] p-4 dark:bg-mod-700 rounded-lg transition-all',
                    isExpanded
                        ? 'h-[148px] pointer-events-auto'
                        : 'h-[0px] pointer-events-none'
                )}
            >
                <ul>
                    <li className="truncate">
                        <span className="dark:text-neutral-300">Name:</span>{' '}
                        {props.repo.name}
                    </li>
                    <li className="truncate">
                        <span className="dark:text-neutral-300">
                            Description:
                        </span>{' '}
                        {props.repo.description}
                    </li>
                    <li>
                        <span className="dark:text-neutral-300">Files:</span>{' '}
                        {props.repo._count.files}
                    </li>
                    <li>
                        <span className="dark:text-neutral-300">
                            Visibility:
                        </span>{' '}
                        {props.repo.isPublic ? 'Public' : 'Private'}
                    </li>
                    <li>
                        <span className=" dark:text-neutral-300">Created:</span>{' '}
                        {props.repo.createdAt}
                    </li>
                </ul>
            </section>
        </div>
    );
}
