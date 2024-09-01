/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

/**
 * Returns a truncated text not exceeding the limit specified.
 * @param text string to truncate
 * @param maxLength number of characters to display.
 * @returns a truncated string.
 */
export const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
};
