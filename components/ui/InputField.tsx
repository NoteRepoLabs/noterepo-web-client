/** Input field props interface */
interface InputFieldProps {
    name: string;
    type: string;
    id: string;
    value: string;
    placeholder: string;
    required: boolean;
    error?: boolean;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    iconPos?: 'right' | 'left';
    noMargin?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** Input field component */
export default function InputField(props: InputFieldProps) {
    return (
        <div
            className={`w-full block relative ${
                !props.noMargin ? 'mb-4' : ''
            } mx-auto`}
        >
            <input
                type={props.type}
                name={props.name}
                id={props.id}
                value={props.value}
                placeholder={props.placeholder}
                required={props.required}
                onChange={props.onChange}
                autoComplete="off"
                spellCheck="false"
                inputMode={props.type === 'email' ? 'email' : 'text'}
                className={`w-[100%] border-[1.5px] py-3 pl-4 pr-12  md:py-4 tracking-wide rounded-xl focus:outline-none font-normal text-base bg-neutral-100 dark:bg-[#11131A] transition-colors  ${
                    props.error
                        ? 'border-vibrant-red'
                        : ' focus:border-neutral-700 border-neutral-200 dark:border-highlight dark:focus:border-neutral-200'
                }`}
                style={{ ...props.style }}
            />
            <div
                className={`absolute top-1/2 transform -translate-y-1/2 ${
                    props.iconPos === 'left' ? 'left-0' : 'right-4'
                }`}
            >
                {props.icon && <>{props.icon}</>}
            </div>
        </div>
    );
}
