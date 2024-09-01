/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

/**
 * Blurred overlay for pop-up modals
 * @returns an overlay component
 */
export default function Overlay() {
    return (
        <div className="block fixed inset-0 bg-neutral-900 bg-opacity-50 backdrop-blur-sm" />
    );
}
