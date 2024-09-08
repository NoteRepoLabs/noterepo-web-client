/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import META from "@/shared/meta";

/**
 * Footer component.
 * @returns a footer component
 */
export default function Footer() {
    const styles = "dark:hover:text-neutral-200 transition-all hover:underline underline-offset-4";

    return (
        <footer className="w-full mt-8 mb-2">
            <ul className="flex gap-2 items-center text-sm dark:text-neutral-300 w-full justify-center py-2">
                <li className={styles}><a target="_blank" href={META.github}>source code</a></li>
                <li>•</li>
                <li className={styles}><a href="/privacy-policy">privacy policy</a></li>
                <li>•</li>
                <li>2024, NoteRepo OSS</li>
            </ul>
        </footer>
    )
}