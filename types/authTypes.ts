/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

// Defines an interface for signing up
export interface AuthCredentials {
    email: string;
    password: string;
}

// Defines an interface for setting username
export interface UsernameCredentials {
    userID: string;
    username: string;
}

// Defines an interface for proving emails
export interface EmailCredentials {
    email: string;
}

// Defines an interface for resetting password
export interface PasswordResetCredentials {
    userID: string,
    password: string
}
