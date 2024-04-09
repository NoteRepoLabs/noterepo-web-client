interface InputFieldProps {
   name: string
   type: string
   id: string
   value: string
   placeholder: string
   required: boolean,
   error?: boolean,
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputField(props: InputFieldProps) {
   return (
      <input
         type={props.type}
         name={props.name}
         id={props.id}
         value={props.value}
         placeholder={props.placeholder}
         required={props.required}
         onChange={props.onChange}
         autoComplete="garbage"
         spellCheck="false"
         className={`w-full block border-[1.5px] py-3 px-4  md:py-4 md:rounded-2xl rounded-xl focus:outline-none font-bold  mb-4 mx-auto bg-neutral-100 dark:bg-neutral-700  ${props.error ? 'border-vibrant-red' :' focus:border-neutral-700 border-neutral-300 dark:border-highlight dark:focus:border-neutral-500'}`}
      />
   )
}
