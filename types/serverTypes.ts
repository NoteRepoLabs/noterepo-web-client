/**
 * Defines an interface for standard server errors
 */
export default interface ServerError {
    status: string,
    path: string,
    message: string
}