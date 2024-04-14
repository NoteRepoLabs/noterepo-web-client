'use client'

import spinningAnimation from '@/animated/spinner.json'
import ErrorText from '@/components/ui/ErrorText'
import FilledButton from '@/components/ui/FilledButton'
import InputField from '@/components/ui/InputField'
import Link from '@/components/ui/Link'
import { EMAIL_PATTERN, SERVER_URL } from '@/config/constants'
import { getCookie, setCookie } from 'cookies-next'
import Lottie from 'lottie-react'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [errorMsg, setErrorMsg] = useState('')
   const [isPending, setIsPending] = useState(false)
   const [isEmailError, setIsEmailError] = useState(false)
   const [isPasswordError, setIsPasswordError] = useState(false)

   if (getCookie('user')) {
      redirect('/')
   }

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

      if (!EMAIL_PATTERN.test(email)) {
         setIsEmailError(true)
         setErrorMsg('Enter a valid email address.')
         setIsPending(false)
         return
      }

      const credentials = { email, password }
      console.log(credentials)

      await fetch(`${SERVER_URL}/auth/sign-in`, {
         method: 'POST',
         mode: 'cors',
         headers: {
            'Content-Type': 'application/json',
         },
         credentials: 'include',
         body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
         }),
      })
         .then(async (res) => {
            if (!res.ok) {
               await res.json().then((json) => {
                  const msg =
                     json.message ?? 'Could not sign in, please retry later.'
                  setErrorMsg(msg)
                  return
               })
            } else {
               await res.json().then((data) => {
                  console.log(data)

                  setCookie('user', {
                     username: data.payload.username,
                     isVerified: data.payload.isVerified,
                     role: data.payload.role,
                  })

                  window.location.href = '/'
               })
            }
         })
         .catch(() => setErrorMsg('Could not reach the server at this time.'))
         .finally(() => setIsPending(false))
   }

   return (
      <section className="!max-w-2xl !w-2xl md:my-8 mx-3 md:mx-auto flex flex-col justify-center items-center min-h-screen">
         <h1 className="font-black text-3xl mb-6 text-neutral-900 dark:text-neutral-100">
            Sign In
         </h1>
         <p className="mt-3 text-center font-bold text-base md:text-lg text-neutral-500 dark:text-neutral-300">
            You&apos;re one step away from accessing all your lecture materials, sign into your account to continue.
         </p>
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
            <p className="w-full flex justify-center mt-8">
               <Link
                  underlined={true}
                  href={'/signup'}
                  text={'Sign Up'}
                  style={{ marginRight: '24px' }}
               />
               <Link
                  underlined={true}
                  href={'/forgot-password'}
                  text={'Forgot Password?'}
               />
            </p>
            {errorMsg && <ErrorText errorMsg={errorMsg} />}
            <FilledButton
               text={isPending ? 'Signing In' : 'Sign In'}
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
