import { cookies } from 'next/headers'
import Image from 'next/image'

type HeaderProps = {
   content: string
}

export default function Header({ content }: HeaderProps) {
   const isLightTheme = cookies().get("theme")?.value === 'light'
   return (
      <section className="max-w-4xl my-8 md:mx-auto mx-4 flex flex-col justify-center items-center">
         <Image
            src={`/img/${
               isLightTheme ? 'NoteRepoLight.svg' : 'NoteRepoDark.svg'
            }`}
            alt="Logo"
            width={240}
            height={94}
         />
         <p
            className={`mt-6 text-center font-bold text-lg ${
               isLightTheme ? 'text-neutral-500' : 'text-neutral-300'
            }`}
         >
            {content}
         </p>
      </section>
   )
}
