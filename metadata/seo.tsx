/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

interface MetadataProps {
    title: string;
    description: string;
}

export default function Metadata({
    title: seoTitle,
    description: seoDescription,
}: MetadataProps) {
    return (
        <>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
        </>
    );
}
