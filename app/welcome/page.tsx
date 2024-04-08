'use client'

import FilledButton from '@/components/ui/FilledButton'
import InputField from '@/components/ui/InputField'
import { useState } from 'react'

export default function Home() {
   const [username, setUsername] = useState('')
   const submitUsername = () => {
      // [TODO]: Verify and make server requests
      console.log('username:', username)
      alert('Welcome!')
   }

   return (
      <section className="max-w-2xl md:my-8 mx-3 md:mx-auto flex flex-col justify-center items-center min-h-screen md:h-auto">
         <h1 className="font-black text-3xl mb-6 text-neutral-900 dark:text-neutral-100">
            Welcome
         </h1>
         <p className="text-center font-medium text-lg text-neutral-500 dark:text-neutral-300 mb-12">
            We&apos;re almost done setting up your account. Add a username to
            proceed.
         </p>
         <InputField
            name="username"
            type="text"
            id="field-username"
            value={username}
            placeholder="Username"
            required={true}
            onChange={(e) => setUsername(e.target.value)}
         />
         <FilledButton text="Let's Go!" onClick={submitUsername} />
      </section>
   )
}
