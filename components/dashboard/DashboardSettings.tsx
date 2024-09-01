/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import { GridViewIcon, LeftToRightListBulletIcon } from 'hugeicons-react';
import Checkbox from '../ui/Checkbox';
import clsx from 'clsx';

interface DashboardSettingsProps {
    privateOnly: boolean;
    savedOnly: boolean;
    viewStyle: 'LIST' | 'GRID';
    togglePrivateOnly: () => void;
    toggleSavedOnly: () => void;
    toggleListView: () => void;
    toggleGridView: () => void;
}

/**
 * Responsible for showing repo filtering and display options.
 * @returns a dashboard settings component.
 */
export default function DashboardSettings(props: DashboardSettingsProps) {
    return (
        <section className="flex items-center justify-between px-4 py-8">
            <section className="flex items-center gap-4">
                <Checkbox
                    label="Private"
                    checked={props.privateOnly}
                    onClick={props.togglePrivateOnly}
                />
                <Checkbox
                    label="Saved"
                    checked={props.savedOnly}
                    onClick={props.toggleSavedOnly}
                />
            </section>

            <section>
                <ul className="flex items-center gap-2">
                    <li
                        onClick={props.toggleListView}
                        className={clsx(
                            'cursor-pointer flex gap-2 items-center select-none opacity-70 hover:opacity-100 transition-opacity',
                            props.viewStyle == 'LIST' && '!opacity-100 font-bold'
                        )}
                    >
                        <LeftToRightListBulletIcon size={18} />
                        <span>List</span>
                    </li>
                    <li
                        onClick={props.toggleGridView}
                        className={clsx(
                            'cursor-pointer flex gap-2 items-center select-none opacity-70 hover:opacity-100 transition-opacity',
                            props.viewStyle == 'GRID' && '!opacity-100 font-bold'
                        )}
                    >
                        <GridViewIcon size={18} />
                        <span>Grid</span>
                    </li>
                </ul>
            </section>
        </section>
    );
}
