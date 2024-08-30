import { SERVER_URL } from '@/config/constants';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export default function getUsers() {
    const accessToken = getCookie('accessToken');

    axios
        .get(`${SERVER_URL}/users`, {
            maxRate: 2,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((res) => {
            const data = res.data;
        });
}
