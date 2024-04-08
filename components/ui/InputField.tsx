type InputFieldProps = {
   name: string
   type: string
   id: string
   value: string
   placeholder: string
   required: boolean
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputField({
   name,
   type,
   id,
   value,
   placeholder,
   required,
   onChange
}: InputFieldProps) {
   return (
      <input
         type={type}
         name={name}
         id={id}
         value={value}
         placeholder={placeholder}
         required={required}
         onChange={onChange}
         autoComplete="off"
         spellCheck="false"
         className="w-full block border-[1.5px] py-3 px-4  md:py-4 md:rounded-2xl rounded-xl focus:outline-none font-bold border-neutral-300 focus:border-neutral-700 mb-4 mx-auto"
      />
   )
}
