/**
 * Defines an interface for signing up
 */
export interface AuthCredentials {
    email: string;
    password: string;
}

/**
 * Defines an interface for setting username
 */
export interface UsernameCredentials {
    userID: string;
    username: string;
}

/** 
 * Defines an interface for proving emails
 */
export interface EmailCredentials {
    email: string;
}

/**
 * Defines an interface for resetting passwords
 */
export interface PasswordResetCredentials {
    userID: string,
    password: string
}
