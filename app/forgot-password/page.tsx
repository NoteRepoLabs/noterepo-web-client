'use client'

import spinningAnimation from '@/animated/spinner.json'
import ErrorText from '@/components/ui/ErrorText'
import FilledButton from '@/components/ui/FilledButton'
import InputField from '@/components/ui/InputField'
import Link from '@/components/ui/Link'
import { EMAIL_PATTERN, SERVER_URL } from '@/config/constants'
import Lottie from 'lottie-react'
import { useState } from 'react'

export default function Home() {
   const [email, setEmail] = useState('')
   const [errorMsg, setErrorMsg] = useState('')
   const [isPending, setIsPending] = useState(false)

   const sendResetEmail = async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setIsPending(true)

      if (!EMAIL_PATTERN.test(email)) {
         setErrorMsg('Enter your proper email address.')
         setIsPending(false)
         return
      }

      console.log('email:', email)
      await fetch(`${SERVER_URL}/users/forget-password`, {
         method: 'POST',
         mode: 'cors',
         headers: {
            'Content-Type': 'application/json',
         },
         credentials: 'include',
         body: JSON.stringify({ email }),
      })
         .then(async (res) => {
            await res.json().then((data) => {
               if (data.status == 'fail') {
                  setErrorMsg(data.message)
                  return
               }
               console.log(data)
               window.location.href = '/sent-reset-email'
            })
         })
         .catch(() => {
            setErrorMsg('Could not reset password at this time.')
         })
         .finally(() => setIsPending(false))
   }

   return (
      <section className="max-w-2xl md:my-8 mx-3 md:mx-auto flex flex-col justify-center items-center min-h-screen">
         <h1 className="font-black text-3xl mb-6 text-neutral-900 dark:text-neutral-100">
            Forgot Your Password?
         </h1>
         <p className="text-center font-bold text-base text-neutral-500 dark:text-neutral-300 mb-12">
            We&apos;ll email you a link to reset your password if you already
            have an account with us.
         </p>
         <InputField
            name="reset-email"
            type="email"
            id="field-email-address"
            value={email}
            placeholder="Email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
         />
         <section className="mt-6 mb-6">
            <Link underlined={true} href="/signin" text="Sign In Instead" />
         </section>
         {errorMsg && <ErrorText errorMsg={errorMsg} />}
         <FilledButton
            text={isPending ? 'Sending Email' : 'Reset Password'}
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
                  sendResetEmail(e)
               }
            }}
            disabled={isPending}
         />
      </section>
   )
}
