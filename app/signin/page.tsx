'use client'

import FilledButton from '@/components/ui/FilledButton'
import Header from '@/components/ui/Header'
import InputField from '@/components/ui/InputField'
import Link from '@/components/ui/Link'
import { SERVER_URL } from '@/config/contants'
import { getCookie } from 'cookies-next'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isEmailError, setIsEmailError] = useState(false)
   const [isPasswordError, setIsPasswordError] = useState(false)
   const [errorMsg, setErrorMsg] = useState('')

   // Redirect the user if they've already been authenticated
   // This prevents them from doing so twice
   if (getCookie('authenticated')) {
      redirect('/')
   }

   // Some validation, then make requests to the server
   const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
      if (email == '') {
         setIsEmailError(true)
         setErrorMsg('Please fill the email field.')
         return
      }

      if (password == '') {
         setIsPasswordError(true)
         setErrorMsg('Please fill the password field.')
         return
      }

      if (password.length < 6) {
         setIsPasswordError(true)
         setErrorMsg('Passwords should be more than 6 characters long.')
         return
      }

      const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!emailPattern.test(email)) {
         setIsEmailError(true)
         setErrorMsg('Enter a valid email address.')
         return
      }

      const credentials = { email, password }
      console.log(credentials)

      await fetch(`${SERVER_URL}/sign-up`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
         }),
      })
         .then(async (res) => {
            if (!res.ok) {
               setErrorMsg('Could not sign in, please retry later.')
               return
            }

            await res.json().then((data) => console.log(data))
         })
         .catch(() => {
            setErrorMsg('Could not reach the server at this time.')
         })
   }

   const signInInformation =
      'This is a collaborative effort to make access to lecture and study materials easier. Sign in or create a new account to get started.'

   return (
      <section className="max-w-2xl md:my-8 mx-3 md:mx-auto flex flex-col justify-center items-center min-h-screen md:h-auto">
         <Header content={signInInformation} />
         <section className="my-8 w-full">
            <InputField
               name="email-field"
               type="email"
               id="email-field"
               value={email}
               placeholder="Email"
               required={true}
               error={isEmailError}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsEmailError(false)
                  setErrorMsg('')
                  setEmail(e.target.value)
               }}
            />
            <InputField
               name="password-field"
               type="password"
               id="password-field"
               value={password}
               placeholder="Password"
               error={isPasswordError}
               required={true}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsPasswordError(false)
                  setErrorMsg('')
                  setPassword(e.target.value)
               }}
            />
            <p>
               <Link
                  underlined={true}
                  href={'/forgot-password'}
                  text={'Forgot Password?'}
               />
            </p>
            <p className="mt-4 text-vibrant-red">{errorMsg}</p>
            <FilledButton text="Sign In" onClick={onSubmit} />
         </section>
      </section>
   )
}
