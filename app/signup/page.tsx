'use client'

import spinningAnimation from '@/animated/spinner.json'
import ErrorText from '@/components/ui/ErrorText'
import FilledButton from '@/components/ui/FilledButton'
import Header from '@/components/ui/Header'
import InputField from '@/components/ui/InputField'
import Link from '@/components/ui/Link'
import { EMAIL_PATTERN, SERVER_URL } from '@/config/constants'
import { getCookie, setCookie } from 'cookies-next'
import { Eye, EyeSlash } from 'iconsax-react'
import Lottie from 'lottie-react'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isPasswordVisible, setIsPasswordVisible] = useState(false)
   const [errorMsg, setErrorMsg] = useState('')
   const [isPending, setIsPending] = useState(false)
   const [isEmailError, setIsEmailError] = useState(false)
   const [isPasswordError, setIsPasswordError] = useState(false)

   // Redirect the user if they've already been authenticated
   // This prevents them from doing so twice
   if (getCookie('user')) {
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

      if (!EMAIL_PATTERN.test(email)) {
         setIsEmailError(true)
         setErrorMsg('Enter a valid email address.')
         setIsPending(false)
         return
      }

      const credentials = { email, password }
      console.log(credentials)

      await fetch(`${SERVER_URL}/auth/sign-up`, {
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

                  window.location.href = '/verify-email'
               })
            }
         })
         .catch(() => setErrorMsg('Could not reach the server at this time.'))
         .finally(() => setIsPending(false))
   }

   const signInInformation =
      'This is a collaborative effort to make access to lecture and study materials easier. Sign in or create a new account to get started.'

   return (
      <section className="!max-w-2xl !w-2xl md:my-8 mx-3 md:mx-auto flex flex-col justify-center items-center min-h-screen">
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
               type={isPasswordVisible ? "text" : "password"}
               id="password-field"
               value={password}
               placeholder="Password"
               error={isPasswordError}
               icon={
                  password &&
                  (isPasswordVisible ? (
                     <EyeSlash
                        size="24"
                        color="#A1A7B5"
                        className="absolute right-[16px] top-[50%] transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                     />
                  ) : (
                     <Eye
                        size="24"
                        color="#A1A7B5"
                        className="absolute right-[16px] top-[50%] transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                     />
                  ))
               }
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
                  href={'/signin'}
                  text={'Sign In'}
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
               text={isPending ? 'Signing Up' : 'Sign Up'}
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
