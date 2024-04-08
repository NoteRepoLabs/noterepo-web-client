interface FilledButtonProps {
   text: string
   styles?: React.CSSProperties,
   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function FilledButton({ text, onClick, styles }: FilledButtonProps) {
   return (
      <button
         onClick={onClick}
         className="w-full block font-bold text-xl bg-neutral-900 text-neutral-200 md:px-3 md:py-4 py-3 rounded-xl md:rounded-2xl my-8 mx-auto hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
         style={{...styles}}
      >
         {text}
      </button>
   )
}