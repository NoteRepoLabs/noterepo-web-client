/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import { SERVER_URL } from '@/config/constants';
import axios from 'axios';
import { getCookie } from 'cookies-next';

/**
 * Test function for fetching all users.
 */
export default function getUsers() {
    const accessToken = getCookie('accessToken');

    axios.get(`${SERVER_URL}/users`, {
        maxRate: 2,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}
