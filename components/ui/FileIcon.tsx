/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import { Trash } from 'iconsax-react';
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
    const chooseFileIcon = (name: string, v2: boolean) => {
        const base = v2 ? '/img/files/v2' : '/img/files';
        const imgRgx = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;

        if (name.includes('.pdf')) return `${base}/file-pdf.svg`;
        if (name.includes('.docx') || name.includes('.doc'))
            return `${base}/file-docx.svg`;
        if (imgRgx.test(name)) return `${base}/file-img.svg`;
        if (name.includes('.ppt')) return `${base}/file-ppt.svg`;
        return `${base}/file-other.svg`;
    };

    return (
        <>
            <section className="flex items-center gap-3 justify-between group w-full">
                <Image
                    width={32}
                    height={32}
                    src={chooseFileIcon(props.filename, true)}
                    alt="file-icon"
                    priority={true}
                    fetchPriority="high"
                    className="select-none"
                />
                <p className="truncate cursor-pointer dark:hover:text-neutral-100 hover:underline underline-offset-4 md:!w-[120px] md:!max-w-[120px] w-full max-w-full">
                    <a
                        href={props.link}
                        target="_blank"
                        title={props.filename}
                        rel="noopener noreferrer"
                    >
                        {props.filename}
                    </a>
                </p>
                <Trash className="grow shrink-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" />
            </section>
        </>
    );
}
