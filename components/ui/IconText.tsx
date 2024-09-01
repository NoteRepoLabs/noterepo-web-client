import clsx from 'clsx';

/** Icon text props interface */
export interface IconTextProps {
    text: string;
    icon: React.ReactElement | null;
    styles?: React.CSSProperties;
    hideText?: boolean;
    classStyle?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

/** Icon text component */
export default function IconText(props: IconTextProps) {
    return (
        <>
            <div
                className={clsx(
                    'inline-flex items-center cursor-pointer space-x-2 select-none dark:text-neutral-300 text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-200',
                    props.classStyle
                )}
                style={{ ...props.styles }}
                onClick={props.onClick}
            >
                <div>{props.icon}</div>
                {!props.hideText && (
                    <span className="font-normal transition-colors text-md">
                        {props.text}
                    </span>
                )}
            </div>
        </>
    );
}
