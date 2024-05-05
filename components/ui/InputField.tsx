interface InputFieldProps {
    name: string;
    type: string;
    id: string;
    value: string;
    placeholder: string;
    required: boolean;
    error?: boolean;
    icon?: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField(props: InputFieldProps) {
    return (
        <div className="w-full block relative mb-4 mx-auto">
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
                inputMode={props.type === 'password' ? 'text' : 'none'}
                className={`max-w-lg w-[100%] border-[1.5px] py-3 pl-4 pr-12  md:py-4 tracking-wide rounded-xl focus:outline-none font-bold bg-neutral-100 dark:bg-neutral-700 transition-colors  ${
                    props.error
                        ? 'border-vibrant-red'
                        : ' focus:border-neutral-700 border-neutral-300 dark:border-highlight dark:focus:border-neutral-200'
                }`}
            />
            <div>{props.icon && <>{props.icon}</>}</div>
        </div>
    );
}
