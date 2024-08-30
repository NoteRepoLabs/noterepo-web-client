interface TextButtonProps {
    text: string;
    styles?: React.CSSProperties;
    icon: React.ReactElement;
    disabled?: boolean;
    danger?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/* Text button components */
export default function TextButton({
    text,
    onClick,
    icon,
    disabled,
    danger,
    styles,
}: TextButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-2 dark:hover:text-neutral-200  border-neutral-300 text-neutral-500 rounded-xl md:rounded-2xl dark:border-highlight dark:text-neutral-300  transition-all disabled:!opacity-70 active:scale-95 ${
                danger ? `hover:!text-vibrant-red` : ''
            }`}
            style={{ ...styles }}
        >
            <div>{icon}</div>
            <span>{text}</span>
        </button>
    );
}
