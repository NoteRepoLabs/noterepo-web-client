/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import Image from 'next/image';

interface FileIconProps {
    filename: string;
    link: string;
}

/**
 * Displays a file icon with the file name.
 * @returns a file icon component.
 */
export default function FileIcon(props: FileIconProps) {
    const chooseFileIcon = (name: string) => {
        const imgRgx = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;

        if (name.includes('.pdf')) return '/img/files/file-pdf.svg';
        if (name.includes('.docx') || name.includes('.doc'))
            return '/img/files/file-docx.svg';
        if (imgRgx.test(name)) return '/img/files/file-img.svg';
        if (name.includes('.ppt')) return '/img/files/file-ppt.svg';
        return '/img/files/file-other.svg';
    };

    return (
        <>
            <section className="flex items-center gap-3">
                <Image
                    width={32}
                    height={32}
                    src={chooseFileIcon(props.filename)}
                    alt="file-icon"
                    className="select-none"
                />
                <p className="truncate cursor-pointer dark:hover:text-neutral-100 hover:underline underline-offset-4">
                    <a
                        href={props.link}
                        target="_blank"
                        title={props.filename}
                        rel="noopener noreferrer"
                    >
                        {props.filename}
                    </a>
                </p>
            </section>
        </>
    );
}
