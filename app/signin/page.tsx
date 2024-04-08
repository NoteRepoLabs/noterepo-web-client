'use client'

import FilledButton from '@/components/ui/FilledButton'
import Header from '@/components/ui/Header'
import InputField from '@/components/ui/InputField'
import { getCookie } from 'cookies-next'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   // Redirect the user if they've already been authenticated
   // This prevents them from doing so twice
   if (getCookie('authenticated')) {
      redirect('/')
   }

   const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
      // [TODO]
      console.log({
         email,
         password,
      })
      //   alert('Submit Triggered')
   }

   const signInInformation =
      'This is a collaborative effort to make access to lecture and study materials easier. Sign in or create a new account to get started.'

   return (
      <section className="max-w-2xl md:my-8 md:mx-auto mx-3 flex flex-col justify-center items-center min-h-screen md:h-auto">
         <Header content={signInInformation} />
         <section className="my-8 w-full">
            <InputField
               name="email-field"
               type="email"
               id="email-field"
               value={email}
               placeholder="Email"
               required={true}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
               }
            />
            <InputField
               name="password-field"
               type="password"
               id="password-field"
               value={password}
               placeholder="Password"
               required={true}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
               }
            />
            <FilledButton text="Sign In" onClick={onSubmit} />
         </section>
      </section>
   )
}
