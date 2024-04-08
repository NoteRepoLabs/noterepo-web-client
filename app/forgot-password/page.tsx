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
      <section className="max-w-2xl md:my-8 mx-3 md:mx-auto flex flex-col justify-center items-center min-h-screen md:h-auto">
         <h1 className="font-black text-3xl mb-6 text-neutral-900 dark:text-neutral-100">
            Forgot Your Password?
         </h1>
         <p className="text-center font-medium text-lg text-neutral-500 dark:text-neutral-300 mb-8">
            We&apos;ll email you a link to reset your password if you already
            have an account with us.
         </p>
         <InputField
            name="reset-email"
            type="email"
            id="field-email-address"
            value={email}
            placeholder="Email"
            required={false}
            onChange={(e) => setEmail(e.target.value)}
         />
         <section className="action-links">
            <Link
               underlined={true}
               href="/resend"
               text="Resend Link"
               style={{ marginRight: '8px' }}
            />
            <Link underlined={true} href="/signin" text="Sign In Instead" />    
         </section>
         <FilledButton
               text="Send Email"
               onClick={sendResetEmail}
               styles={{ width: '100%' }}
            />
      </section>
   )
}
