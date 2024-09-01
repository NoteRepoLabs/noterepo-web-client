/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import Checkbox from '../ui/Checkbox';

interface DashboardSettingsProps {
    privateOnly: boolean;
    savedOnly: boolean;
    togglePrivateOnly: () => void;
    toggleSavedOnly: () => void;
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
                    label="Private Only"
                    checked={props.privateOnly}
                    onClick={props.togglePrivateOnly}
                />
                <Checkbox
                    label="Saved Only"
                    checked={props.savedOnly}
                    onClick={props.toggleSavedOnly}
                />
            </section>

            <section>
                <ul className="flex items-center gap-2">
                    <li>List</li>
                    <li>Grid</li>
                </ul>
            </section>
        </section>
    );
}
