/* Interface definition for repos */
export default interface Repo {
    id: string;
    name: string;
    description: string;
    tags: string[];
    isPublic: boolean;
    files: any[];
    createdAt: string;
}
