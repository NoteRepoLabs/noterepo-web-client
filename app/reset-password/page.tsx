'use client'

import spinningAnimation from '@/animated/spinner.json'
import FilledButton from '@/components/ui/FilledButton'
import InputField from '@/components/ui/InputField'
import Lottie from 'lottie-react'
import { useState } from 'react'

export default function Home() {
   const [password, setPassword] = useState('')
   const [passwordConfirmation, setPasswordConfirmation] = useState('')
   const [isPasswordError, setIsPasswordError] = useState(false)
   const [errorMsg, setErrorMsg] = useState('')
   const [isPending, setIsPending] = useState(false)

   const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setIsPending(true)
      if (password.length < 6 || passwordConfirmation.length < 6) {
         setIsPasswordError(true)
         setErrorMsg('Password should be at least 6 characters long.')
         setIsPending(false)
         return
      }

      if (password !== passwordConfirmation) {
         setIsPasswordError(true)
         setErrorMsg('Passwords mismatch.')
         setIsPending(false)
         return
      }

      alert('Reset Password Not Implemented')

      setIsPending(false)
   }

   return (
      <section className="max-w-2xl md:my-8 mx-3 md:mx-auto flex flex-col justify-center items-center min-h-screen">
         <h1 className="font-black text-3xl mb-6 text-neutral-900 dark:text-neutral-100">
            Reset Your Password
         </h1>
         <p className="text-center font-bold text-base text-neutral-500 dark:text-neutral-300 mb-8">
            You&apos;re on this page because you chose to reset your password.
            Enter a new one to continue.
         </p>
         <section className="my-8 w-full">
            <InputField
               name="password-field"
               type="password"
               id="password-field"
               value={password}
               placeholder="Password"
               required={true}
               error={isPasswordError}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsPasswordError(false)
                  setErrorMsg('')
                  setPassword(e.target.value)
               }}
            />
            <InputField
               name="password-confirm-field"
               type="password"
               id="password-confirm-field"
               value={passwordConfirmation}
               placeholder="Confirm New Password"
               required={true}
               error={isPasswordError}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsPasswordError(false)
                  setErrorMsg('')
                  setPasswordConfirmation(e.target.value)
               }}
            />
            <p className="mt-4 text-vibrant-red font-bold">{errorMsg}</p>
            <FilledButton
               text="Reset My Password"
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
