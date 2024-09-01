/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

interface LinkProps {
    underlined: boolean;
    href?: string;
    text: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function Link({
    underlined,
    href,
    text,
    style,
    onClick,
}: LinkProps) {
    return (
        <a
            href={href}
            className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-200 font-normal transition-colors"
            style={{
                textDecoration: underlined ? 'underline' : 'none',
                ...style,
            }}
            onClick={onClick}
        >
            {text}
        </a>
    );
}
