/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import Repo from '@/types/repoTypes';
import { Bookmark02Icon, Delete02Icon } from 'hugeicons-react';
import { FolderOpen } from 'iconsax-react';

interface RepoGridItemProps {
    repo: Repo;
    onDeleteClick: () => void;
    onClick: () => void;
}

/**
 * Responsible for displaying repo information quickly in a grid layout.
 * @param props used for modifying grid card functionality
 * @returns a repo grid card item
 */
export default function RepoGridItem(props: RepoGridItemProps) {
    return (
        <div className="w-full p-8 rounded-2xl cursor-pointer border-2 border-mod-300 dark:border-highlight transition-all hover:border-vibrant-green dark:hover:border-vibrant-green group select-none hover:scale-95">
            <div className="group-hover:translate-y-[-10px] transition-all flex flex-col justify-between h-[120px]">
                <div onClick={props.onClick}>
                    <h1 className="flex items-center gap-2 text-xl font-extrabold mb-2 max-w-[200px]">
                        <FolderOpen
                            variant="Bulk"
                            size={24}
                            className="flex-shrink-0"
                        />
                        <span className="truncate">{props.repo.name}</span>
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-300 truncate">
                        {props.repo.description}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-neutral-500 dark:text-neutral-300 flex gap-2 items-center">
                        <div
                            className={`w-[8px] h-[8px] ${
                                props.repo.isPublic
                                    ? 'bg-vibrant-green'
                                    : 'bg-neutral-500'
                            } rounded-xl`}
                        ></div>
                        <span>
                            {props.repo.isPublic ? 'Public' : 'Private'}
                        </span>
                    </p>
                    <section className="flex items-center gap-2 opacity-0 transition-all group-hover:opacity-100">
                        <Bookmark02Icon
                            size={18}
                            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
                        />
                        <Delete02Icon
                            size={18}
                            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
                            onClick={props.onDeleteClick}
                        />
                    </section>
                </div>
            </div>
        </div>
    );
}
