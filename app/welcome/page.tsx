'use client'

import spinningAnimation from '@/animated/spinner.json'
import FilledButton from '@/components/ui/FilledButton'
import InputField from '@/components/ui/InputField'
import { SERVER_URL } from '@/config/constants'
import { setCookie } from 'cookies-next'
import Lottie from 'lottie-react'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function Home() {
   const [username, setUsername] = useState('')
   const [isPending, setIsPending] = useState(false)
   const [errorMsg, setErrorMsg] = useState('')
   const searchParams = useSearchParams()

   const submitUsername = async (e: React.FormEvent<HTMLButtonElement>) => {
      setIsPending(true)
      if (!username) {
         setErrorMsg('Please fill the username field.')
         setIsPending(false)
         return
      }

      if (username.length > 15) {
         setErrorMsg('Username cannot exceed 15 characters.')
         setIsPending(false)
         return
      }

      console.log('username:', username)
      const userID = searchParams.get('userId')

      if (!userID) {
         setErrorMsg('Unable to verify account status, please sign in.')
         setIsPending(false)
         return
      }

      await fetch(`${SERVER_URL}/auth/setInitialUsername/${userID}`, {
         method: 'POST',
         mode: 'cors',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ username }),
      })
         .then(async (res) => {
            if (!res.ok) {
               await res.json().then((data) => {
                  console.log(data)
                  const msg = 'An error occurred while setting up.'
                  setErrorMsg(msg)
                  setIsPending(false)
                  return
               })
            } else {
               await res.json().then((data) => {
                  console.log(data)
                  setIsPending(false)
                  setErrorMsg('')
                  setCookie('authenticated', true)
                  window.location.href = '/'
                  return
               })
            }
         })
         .catch(() => {
            setErrorMsg('Failed to process request.')
            setIsPending(false)
         })

      setIsPending(false)
   }

   return (
      <section className="max-w-2xl md:my-8 mx-3 md:mx-auto flex flex-col justify-center items-center min-h-screen md:h-auto">
         <h1 className="font-black text-3xl mb-6 text-neutral-900 dark:text-neutral-100">
            Welcome
         </h1>
         <p className="text-center font-bold text-base text-neutral-500 dark:text-neutral-300 mb-12">
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
            onChange={(e) => {
               setErrorMsg('')
               setUsername(e.target.value)
            }}
         />
         <div className="w-full">
            <p className="mt-4 text-vibrant-red font-bold">{errorMsg}</p>
         </div>
         <FilledButton
            text={isPending ? 'Setting Up' : "Let's Go!"}
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
                  submitUsername(e)
               }
            }}
            disabled={isPending}
         />
      </section>
   )
}
