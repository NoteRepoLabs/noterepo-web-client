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
                className={`bg-vibrant-green flex items-center py-3 px-4 rounded-lg ${props.className} justify-center shadow-lg hover:opacity-90 transition-opacity w-[140px]`}
                style={{ ...props.style }}
            >
                <Add size="24" variant="Outline" className='text-neutral-800' />
                <span className="!font-bold text-base text-neutral-800">
                    {props.text}
                </span>
            </button>
        </>
    );
}
