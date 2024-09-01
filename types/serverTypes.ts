/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

// Defines an interface for standard server responses
export default interface ServerResponse {
    status: string;
    path: string;
    message: string;
}
