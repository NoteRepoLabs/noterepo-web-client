interface FilledButtonProps {
   text: string
   styles?: React.CSSProperties
   icon?: React.ReactElement | null
   disabled?: boolean
   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function FilledButton({
   text,
   onClick,
   icon,
   disabled,
   styles,
}: FilledButtonProps) {
   return (
      <button
         onClick={onClick}
         disabled={disabled}
         className="max-w-lg w-[100%] flex justify-center items-center font-bold text-lg bg-neutral-900 text-neutral-200 md:px-3 md:py-4 py-3 rounded-xl md:rounded-2xl mt-8 mx-auto hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors"
         style={{ ...styles }}
      >
         <div className="w-8 max-w-8 h-8 max-h-8">{icon}</div>
         <span className="mr-8">{text}</span>
      </button>
   )
}
