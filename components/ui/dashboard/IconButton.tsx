import { AddSquare } from 'iconsax-react';

/** Icon button props interface */
interface IconButtonProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
}

/** Icon button component */
export default function IconButton(props: IconButtonProps) {
    return (
        <>
            <button
                className={`bg-neutral-900 dark:bg-neutral-100 flex py-3 px-4 rounded-xl space-x-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 ${props.className} max-w-[160px]`}
                style={{ ...props.style }}
            >
                <AddSquare size="24" variant="Bold" className='text-neutral-100 dark:text-neutral-900' />
                <span className="font-extrabold text-md text-neutral-200 dark:text-neutral-900">
                    {props.text}
                </span>
            </button>
        </>
    );
}
