import Repo from '@/types/repoTypes';

interface RepoCardProps {
    repo: Repo;
}

export default function RepoCard(props: RepoCardProps) {
    return (
        <div className="w-full p-8 rounded-2xl cursor-pointer border-2 border-neutral-200 dark:border-highlight transition-all hover:border-vibrant-green dark:hover:border-vibrant-green group">
            <div className="group-hover:translate-y-[-10px] transition-all flex flex-col justify-between h-[100px]">
                <div>
                    <h1 className="text-xl font-extrabold mb-2 truncate">
                        {props.repo.name}
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-300 max-h-[20px] truncate">
                        {props.repo.description}
                    </p>
                </div>
                <div>
                    <p className="mt-2 text-neutral-500 dark:text-neutral-300">
                        {props.repo.isPublic ? 'Public' : 'Private'}
                    </p>
                    <p>
                        
                    </p>
                </div>
            </div>
        </div>
    );
}
