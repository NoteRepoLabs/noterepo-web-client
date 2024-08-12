import Repo from "@/types/repoTypes";

const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

export const saveReposToCache = (repos: Repo[]) => {
    localStorage.setItem('repos', JSON.stringify(repos));
    localStorage.setItem('reposCacheTime', JSON.stringify(Date.now()));
};

export const isCacheExpired = (): boolean => {
    const cacheTime = JSON.parse(localStorage.getItem('reposCacheTime') || '0');
    return Date.now() - cacheTime > CACHE_EXPIRY_TIME;
};
