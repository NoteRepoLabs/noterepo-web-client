/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import shared from '@/shared/constants';
import Repo from '@/types/repoTypes';

export const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

/**
 * Caches a repo collection to local storage and tracks cache time.
 * @param repos a collection of repos belonging to this user.
 */
export const saveReposToCache = (repos: Repo[]) => {
    localStorage.setItem(shared.keys.REPOS, JSON.stringify(repos));
    localStorage.setItem(shared.keys.REPOS_CACHE, JSON.stringify(Date.now()));
};

/**
 * Responsible for cache invalidation.
 * @returns true if the current time has exceed cache validity.
 */
export const isCacheExpired = (): boolean => {
    const cacheTime = JSON.parse(
        localStorage.getItem(shared.keys.REPOS_CACHE) || '0'
    );
    return Date.now() - cacheTime > CACHE_EXPIRY_TIME;
};

/**
 * Responsible for invalidating single repo caches.
 * @returns true if the current time has exceed single cache validity.
 */
export const isSingleCacheExpired = (id: string): boolean => {
    const cacheTime = JSON.parse(
        localStorage.getItem(`${shared.keys.SINGLE_REPO_CACHE_TIME}-${id}`) ||
            '0'
    );
    return Date.now() - cacheTime > CACHE_EXPIRY_TIME;
};
