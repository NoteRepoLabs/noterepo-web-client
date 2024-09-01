/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

/**
 * Extracting local storage and cookie keys to increase
 * obfuscation.
 */
const shared = {
    keys: {
        REFRESH_TOKEN: "__rfs",
        ACCESS_TOKEN: "__acs",
        USER: "__su",
        REPOS: "__reps",
        REPOS_CACHE: "_crp"
    }
}

export default shared;