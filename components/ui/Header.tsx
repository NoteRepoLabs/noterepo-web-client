import { cookies } from 'next/headers'
import Image from 'next/image'

type HeaderProps = {
   content: string
}

export default function Header({ content }: HeaderProps) {
   return (
      <>
         <Image
            src={`/img/${
               cookies().get('theme')?.value != 'dark'
                  ? 'NoteRepoLight.svg'
                  : 'NoteRepoDark.svg'
            }`}
            alt="Logo"
            width={240}
            height={94}
         />
         <p
            className={`mt-6 text-center font-bold text-base md:text-lg ${
               cookies().get('theme')?.value != 'dark'
                  ? 'text-neutral-500'
                  : 'text-neutral-300'
            }`}
         >
            {content}
         </p>
      </>
   )
}
