/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import spinningAnimation from '@/animated/spinner.json';
import clsx from 'clsx';
import { Trash } from 'iconsax-react';
import Lottie from 'lottie-react';
import Image from 'next/image';

interface FileListItemProps {
    filename: string;
    link: string;
    isPending: boolean;
    hidden: boolean;
    onDeleteClick: () => void;
}

/**
 * Displays a file icon with the file name.
 * @returns a file icon component.
 */
export default function FileListItem(props: FileListItemProps) {
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

    if (props.hidden) return <></>

    return (
        <>
            <section
                className={clsx(
                    'flex items-center gap-3 justify-between group w-full',
                    props.isPending ? 'pointer-events-none' : ''
                )}
            >
                <div className="flex items-center gap-2">
                    {props.isPending ? (
                        <div className="max-w-4 max-h-4">
                            <Lottie
                                animationData={spinningAnimation}
                                loop={true}
                                height={'32px'}
                                width={'32px'}
                                rendererSettings={{
                                    preserveAspectRatio: 'xMidYMid slice',
                                }}
                            />
                        </div>
                    ) : (
                        <Image
                            width={32}
                            height={32}
                            src={chooseFileIcon(props.filename, true)}
                            alt="file-icon"
                            priority={true}
                            fetchPriority="high"
                            className="select-none"
                        />
                    )}

                    <p
                        className={clsx(
                            'truncate cursor-pointer dark:hover:text-neutral-100 hover:underline underline-offset-4 md:!w-[120px] md:!max-w-[120px] w-full max-w-full',
                            props.isPending
                                ? '!opacity-50 hover:!no-underline'
                                : ''
                        )}
                    >
                        {props.isPending ? (
                            <span>Deleting</span>
                        ) : (
                            <a
                                href={props.link}
                                target="_blank"
                                title={props.filename}
                                rel="noopener noreferrer"
                            >
                                {props.filename}
                            </a>
                        )}
                    </p>
                </div>
                {!props.isPending && (
                    <Trash
                        className="shrink-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-all hover:text-vibrant-red"
                        onClick={props.onDeleteClick}
                    />
                )}
            </section>
        </>
    );
}
