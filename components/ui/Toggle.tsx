interface ToggleProps {
    text: string;
    toggled: boolean;
    onClick: () => void;
}

/* Toggle component */
export default function Toggle({ text, toggled, onClick }: ToggleProps) {
    return (
        <div className="flex gap-2 items-center">
            <div className="relative cursor-pointer" onClick={() => onClick()}>
                <div
                    className={`w-[20px] h-[20px] rounded-3xl bg-neutral-100 absolute top-[50%] ${
                        toggled ? 'left-[26px]' : 'left-[3px]'
                    } translate-y-[-50%] shadow-md transition-all`}
                ></div>
                <div
                    className={`w-[48px] h-[26px] rounded-3xl ${
                        toggled ? 'bg-vibrant-green' : 'bg-neutral-500'
                    }`}
                ></div>
            </div>
            <span
                className={`${
                    toggled
                        ? 'text-neutral-900 dark:text-neutral-100'
                        : 'text-neutral-500 dark:text-neutral-300'
                }`}
            >
                {text}
            </span>
        </div>
    );
}