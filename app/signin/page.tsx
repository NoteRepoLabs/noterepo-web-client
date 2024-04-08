import Header from '@/components/ui/Header'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
   if (cookies().has('authenticated')) {
      redirect('/')
   }
   const signInInformation =
      'This is a collaborative effort to make access to lecture and study materials easier. Sign in or create a new account to get started.'
   return (
      <section className="max-w-3xl my-8 md:mx-auto mx-4 flex flex-col justify-center items-center">
         <Header content={signInInformation} />
      </section>
   )
}
