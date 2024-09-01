/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import Repo from '@/types/repoTypes';
import { formatDate } from '@/util/date';
import clsx from 'clsx';
import { ArrowDown01Icon, Bookmark02Icon, Delete02Icon } from 'hugeicons-react';
import { FolderOpen } from 'iconsax-react';
import { useState } from 'react';

interface RepoListItemProps {
    userID: string;
    repoID: string;
    repo: Repo;
    onDeleteClick: () => void;
}

/**
 * Responsible for showing information on a repo, developed as a
 * replacement for the previous box-view card component.
 * @returns a repo item card component
 */
export default function RepoListItem(props: RepoListItemProps) {
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
                <section className="flex items-center gap-2 transition-all">
                    <Bookmark02Icon
                        size={18}
                        className={clsx(
                            'opacity-70 hover:opacity-100 transition-opacity cursor-pointer group-hover:visible invisible',
                            isExpanded ? '!visible' : 'invisible'
                        )}
                    />
                    <Delete02Icon
                        size={18}
                        className={clsx(
                            'opacity-70 hover:opacity-100 transition-opacity cursor-pointer group-hover:visible invisible hover:text-vibrant-red',
                            isExpanded ? '!visible' : 'invisible'
                        )}
                        onClick={props.onDeleteClick}
                    />
                    <ArrowDown01Icon
                        className={clsx(
                            'opacity-80 hidden group-hover:block cursor-pointer',
                            isExpanded ? 'rotate-180 !block' : 'rotate-0'
                        )}
                        onClick={toggleExpanded}
                    />
                </section>
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
                    <li className="flex gap-2 items-center">
                        <span className="dark:text-neutral-300">
                            Visibility:
                        </span>{' '}
                        <div className="flex gap-1 items-center">
                            <div
                                className={`w-[6px] h-[6px] ${
                                    props.repo.isPublic
                                        ? 'bg-vibrant-green'
                                        : 'bg-neutral-500'
                                } rounded-xl`}
                            ></div>
                            <span>
                                {props.repo.isPublic ? 'Public' : 'Private'}
                            </span>
                        </div>
                    </li>
                    <li>
                        <span className=" dark:text-neutral-300">Created:</span>{' '}
                        {formatDate(props.repo.createdAt)}
                    </li>
                </ul>
            </section>
        </div>
    );
}
