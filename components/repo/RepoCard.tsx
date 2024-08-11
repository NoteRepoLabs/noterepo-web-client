import Repo from '@/types/repoTypes';

interface RepoCardProps {
    repo: Repo;
}

export default function RepoCard(props: RepoCardProps) {
    return (
        <div className="w-[200px] p-8 rounded-lg">
            <h1>{props.repo.name}</h1>
            <p>{props.repo.description}</p>
        </div>
    );
}
