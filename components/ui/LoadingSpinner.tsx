/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

// import { HashLoader } from 'react-spinners';
import BarLoader from 'react-spinners/BarLoader';

export default function LoadingSpinner() {
    return (
        <div className="flex">
            <BarLoader loading={true} color={"#30F094"} />
        </div>
    );
}
