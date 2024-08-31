/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import Repo from '@/types/repoTypes';
import { FolderOpen } from 'iconsax-react';

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
    return (
        <div>
            <header className="flex items-center justify-between dark:hover:bg-neutral-800 p-2 rounded-lg cursor-pointer transition-all hover:scale-[.98]">
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
            </header>
        </div>
    );
}
