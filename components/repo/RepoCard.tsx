import Repo from '@/types/repoTypes';
import { Bookmark02Icon, Delete02Icon } from 'hugeicons-react';

interface RepoCardProps {
    repo: Repo;
    onDeleteClick: () => void;
    onClick: () => void;
}

export default function RepoCard(props: RepoCardProps) {
    return (
        <div
            onClick={props.onClick}
            className="w-full p-8 rounded-2xl cursor-pointer border-2 border-neutral-200 dark:border-highlight transition-all hover:border-vibrant-green dark:hover:border-vibrant-green group"
        >
            <div className="group-hover:translate-y-[-10px] transition-all flex flex-col justify-between h-[120px]">
                <div>
                    <h1 className="text-xl font-extrabold mb-2 truncate">
                        {props.repo.name}
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
