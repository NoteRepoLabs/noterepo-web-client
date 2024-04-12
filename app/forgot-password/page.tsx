'use client'

import FilledButton from '@/components/ui/FilledButton'
import InputField from '@/components/ui/InputField'
import Link from '@/components/ui/Link'
import { useState } from 'react'

export default function Home() {
   const [email, setEmail] = useState('')
   const sendResetEmail = () => {
      // [TODO]: Make server requests
      console.log('email:', email)
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
            <Link
               underlined={true}
               href=""
               text="Resend Link"
               style={{ marginRight: '12px' }}
               onClick={(e) => {
                  e.preventDefault()
                  alert('Resend Link Not Implemented')
               }}
            />
            <Link underlined={true} href="/signin" text="Sign In Instead" />
         </section>
         <FilledButton
            text="Send Link"
            onClick={sendResetEmail}
            styles={{ width: '100%' }}
         />
      </section>
   )
}
