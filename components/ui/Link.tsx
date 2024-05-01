interface LinkProps {
   underlined: boolean
   href?: string
   text: string
   style?: React.CSSProperties
   onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function Link({ underlined, href, text, style, onClick }: LinkProps) {
   return (
      <a
         href={href}
         className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-200 font-semibold transition-colors"
         style={{
            textDecoration: underlined ? 'underline' : 'none',
            ...style,
         }}
         onClick={onClick}
      >
         {text}
      </a>
   )
}
