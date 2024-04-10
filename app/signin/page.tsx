'use client'

import FilledButton from '@/components/ui/FilledButton'
import Header from '@/components/ui/Header'
import InputField from '@/components/ui/InputField'
import Link from '@/components/ui/Link'
import { SERVER_URL } from '@/config/constants'
import { getCookie } from 'cookies-next'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import spinningAnimation from '@/animated/spinner.json'
import Lottie from 'lottie-react'

export default function Home() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [errorMsg, setErrorMsg] = useState('')
   const [isPending, setIsPending] = useState(false)
   const [isEmailError, setIsEmailError] = useState(false)
   const [isPasswordError, setIsPasswordError] = useState(false)

   // Redirect the user if they've already been authenticated
   // This prevents them from doing so twice
   if (getCookie('authenticated')) {
      redirect('/')
   }

   // Some validation, then make requests to the server
   const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
      setIsPending(true)
      setErrorMsg('')

      if (email == '') {
         setIsEmailError(true)
         setErrorMsg('Please fill the email field.')
         setIsPending(false)
         return
      }

      if (password == '') {
         setIsPasswordError(true)
         setErrorMsg('Please fill the password field.')
         setIsPending(false)
         return
      }

      if (password.length < 6) {
         setIsPasswordError(true)
         setErrorMsg('Password should be more than 6 characters long.')
         setIsPending(false)
         return
      }

      const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!emailPattern.test(email)) {
         setIsEmailError(true)
         setErrorMsg('Enter a valid email address.')
         setIsPending(false)
         return
      }

      const credentials = { email, password }
      console.log(credentials)

      await fetch(`${SERVER_URL}/sign-up`, {
         method: 'POST',
         mode: 'cors',
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
         .finally(() => setIsPending(false))
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
            <p className="mt-4 text-vibrant-red font-bold">{errorMsg}</p>
            <FilledButton
               text="Sign In"
               icon={
                  isPending ? (
                     <Lottie
                        animationData={spinningAnimation}
                        loop={true}
                        height={'32px'}
                        width={'32px'}
                        rendererSettings={{
                           preserveAspectRatio: 'xMidYMid slice',
                        }}
                     />
                  ) : null
               }
               onClick={(e) => {
                  if (!isPending) {
                     onSubmit(e)
                  }
               }}
               disabled={isPending}
            />
         </section>
      </section>
   )
}
