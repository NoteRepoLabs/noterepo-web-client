/* Interface definition for repos */
export default interface Repo {
    name: string;
    description: string;
    tags: string[];
    isPublic: boolean;
}
