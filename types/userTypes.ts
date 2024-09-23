/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

// Defines an interface for interacting with the user object
export interface IUser {
    id: string;
    username: string;
    email: string;
    bio: string;
    role: string;
    isVerified: boolean;
    search_token: string;
}
