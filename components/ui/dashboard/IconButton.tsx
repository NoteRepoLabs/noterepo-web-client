import { Add } from 'iconsax-react';

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
                className={`bg-vibrant-green flex items-center py-3 px-4 rounded-xl space-x-2 ${props.className} justify-center shadow-lg border-2 border-neutral-800 border-opacity-20 hover:opacity-90 transition-opacity`}
                style={{ ...props.style }}
            >
                <Add size="24" variant="Outline" className='text-neutral-800' />
                <span className="!font-extrabold text-lg text-neutral-800">
                    {props.text}
                </span>
            </button>
        </>
    );
}
