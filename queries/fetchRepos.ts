import { SERVER_URL } from '@/config/constants';
import shared from '@/shared/constants';
import Repo from '@/types/repoTypes';
import { isCacheExpired } from '@/util/cache';
import axios from 'axios';

/**
 * Requests a collection of repositories owned by the logged in user.
 * Firstly we get the user's ID and refresh token and request for an access token.
 * Then use the access token to request for the repo collection, the request is cached
 * to improve performance.
 * @param accessToken Users access token for elevated privileges
 * @param onSuccess Callback to handle the data returned
 * @param cacheFunction Callback to handle data caching
 * @param onFailure Callback to deal with failed requests.
 */
const fetchRepos = async (
    userID: string,
    accessToken: string,
    onSuccess: (data: any) => void,
    cacheFunction: ((data: any) => void) | null,
    onFailure: (err: any) => void
) => {
    try {;
        const response = await axios.get(`${SERVER_URL}/users/${userID}/repo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const fetchedRepos = response.data['payload'];
        const cachedRepos = JSON.parse(
            localStorage.getItem(shared.keys.REPOS) || '[]'
        );

        fetchedRepos.sort(
            (a: Repo, b: Repo) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );

        // Check if repos have changed
        if (JSON.stringify(fetchedRepos) != JSON.stringify(cachedRepos)) {
            cacheFunction && cacheFunction(fetchedRepos);
        }

        onSuccess(fetchedRepos);
        if (isCacheExpired()) cacheFunction && cacheFunction(fetchedRepos);

        // DEBUG: console.log(fetchedRepos);
    } catch (error) {
        onFailure(error);
    }
};

export default fetchRepos;
