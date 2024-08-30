/* Interface definition for repos */

export interface RepoFile {
    id: string;
    createdAt: string;
    name: string;
    publicName: string;
    userID: string;
    urlLink: string;
    repoID: string;
}

export default interface Repo {
    id: string;
    name: string;
    description: string;
    tags: string[];
    isPublic: boolean;
    files: RepoFile[];
    createdAt: string;
}
