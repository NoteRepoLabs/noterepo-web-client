'use client'

import { getCookie } from 'cookies-next'
import { redirect } from 'next/navigation'

export default function Home() {
   if (!getCookie('user')) {
      redirect('/signup')
   }
   return (
      <section className="max-w-2xl md:my-8 mx-3 md:mx-auto flex flex-col justify-center items-center min-h-screen">
         <h1 className="font-black text-3xl mb-6 text-neutral-900 dark:text-neutral-100">
            Welcome Home
         </h1>
         <p className="text-center font-bold text-base text-neutral-500 dark:text-neutral-300 mb-12">
            You&apos;ve successfully setup your NoteRepo account.
         </p>
      </section>
   )
}
