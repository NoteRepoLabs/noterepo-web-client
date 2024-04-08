interface LinkProps {
   underlined: boolean
   href: string
   text: string
   style?: React.CSSProperties
}

export default function Link({ underlined, href, text, style }: LinkProps) {
   return (
      <a
         href={href}
         className="text-neutral-500 font-semibold dark:text-neutral-300"
         style={{
            textDecoration: underlined ? 'underline' : 'none',
            ...style,
         }}
      >
         {text}
      </a>
   )
}
