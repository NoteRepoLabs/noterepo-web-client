import { getCookie } from 'cookies-next'
import Image from 'next/image'

type HeaderProps = {
   content: string
}

export default function Header({ content }: HeaderProps) {
   return (
      <>
         <Image
            src={`/img/${
               getCookie('theme') != 'dark'
                  ? 'NoteRepoLight.svg'
                  : 'NoteRepoDark.svg'
            }`}
            alt="Logo"
            width={180}
            height={72}
            className="md:w-[240px] md:h-[94px]"
         />
         <p
            className={`mt-6 text-center font-bold text-base md:text-lg ${
               getCookie('theme') != 'dark'
                  ? 'text-neutral-500'
                  : 'text-neutral-300'
            }`}
         >
            {content}
         </p>
      </>
   )
}
