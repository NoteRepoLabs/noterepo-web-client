/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import BarLoader from 'react-spinners/BarLoader';

export default function LoadingSpinner() {
    return (
        <div className="flex">
            <BarLoader loading={true} color={'#FFFFFF'} />

            {/* <h3 className="ml-4 font-bold">Loading!</h3> */}
        </div>
    );
}
