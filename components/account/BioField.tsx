/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client';

interface BioFieldProps {
    bio: string;
    onChange: (value: string) => void;
}

/**
 * Responsible for editing and displaying user bio.
 */
export default function BioField(props: BioFieldProps) {
    return (
        <>
            <textarea
                name="user-bio"
                id="noterepo-bio"
                placeholder="A few things about myself!"
                className="w-full min-h-[48px] h-[48px] p-2 border-2 border-highlight dark:bg-neutral-900 bg-neutral-100 outline-none dark:focus:border-neutral-200 transition-all max-h-[80px]"
                value={props.bio}
                onChange={(e) => props.onChange(e.target.value)}
            >
            </textarea>
        </>
    );
}
