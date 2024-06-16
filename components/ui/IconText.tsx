/** Icon text props interface */
export interface IconTextProps {
    text: string;
    icon: React.ReactElement | null;
    styles?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

/** Icon text component */
export default function IconText(props: IconTextProps) {
    return (
        <>
            <div
                className="inline-flex items-center cursor-pointer space-x-2"
                style={{ ...props.styles }}
                onClick={props.onClick}
            >
                <div>{props.icon}</div>
                <span className="font-bold text-neutral-300 dark:hover:text-neutral-200 hover:text-neutral-700 transition-colors text-md">
                    {props.text}
                </span>
            </div>
        </>
    );
}
