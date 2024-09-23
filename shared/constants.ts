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
    fileLimit: 50,
    keys: {
        REFRESH_TOKEN: "__rfs",
        ACCESS_TOKEN: "__acs",
        USER: "__su",
        REPOS: "__reps",
        REPOS_CACHE: "_crp",
        SINGLE_REPO_CACHE_TIME: "_tsr",
        FORCE_UPDATE: "_forced",
        REPO_VIEW: "_device_repo_view"
    }
}

export default shared;