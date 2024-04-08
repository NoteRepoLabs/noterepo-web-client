'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type HeaderProps = {
   content: string
}

const logoSrcLight = '/img/NoteRepoLight.svg'
const logoSrcDark = '/img/NoteRepoDark.svg'

export default function Header({ content }: HeaderProps) {
   const { resolvedTheme } = useTheme()
   const [mounted, setMounted] = useState(false)
   useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) {
      return null
   }

   return (
      <>
         <Image
            src={resolvedTheme == 'dark' ? logoSrcDark : logoSrcLight}
            alt="Logo"
            width={180}
            height={72}
            className="md:w-[240px] md:h-[94px]"
         />
         <p
            className={`mt-6 text-center font-bold text-base md:text-lg text-neutral-500 dark:text-neutral-300`}
         >
            {content}
         </p>
      </>
   )
}
