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
        <div>
            <header
                className="flex items-center justify-between dark:hover:bg-neutral-800 p-2 rounded-lg cursor-pointer transition-all hover:scale-[.98] group"
                onClick={toggleExpanded}
            >
                <section className="flex items-center gap-2">
                    <FolderOpen variant="Bulk" size={24} />
                    <h3>
                        <a
                            href={`/repo?user=${props.userID}&repo=${props.repoID}`}
                            rel="noopener noreferrer"
                            title={`${props.repo.name}`}
                            className="text-lg"
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
        </div>
    );
}
