/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

// Repo file instance properties
export interface RepoFile {
    id: string;
    createdAt: string;
    name: string;
    publicName: string;
    userID: string;
    urlLink: string;
    repoID: string;
}

// Repo instance properties
export default interface Repo {
    id: string;
    name: string;
    description: string;
    tags: string[];
    isPublic: boolean;
    files: RepoFile[];
    createdAt: string;
    _count: { files: number };
}
