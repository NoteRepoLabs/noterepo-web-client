// Defines an interface for interacting with the user object
export interface UserInterface {
    id: string;
    username: string;
    email: string;
    role: string;
    isVerified: boolean;
    search_token: string;
}
