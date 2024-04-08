import Header from '@/components/ui/Header'
import { cookieStore } from '@/util/store'
import { redirect } from 'next/navigation'

export default function Home() {
   if (cookieStore.has('authenticated')) {
      redirect('/')
   }
   const signInInformation =
      'This is a collaborative effort to make access to lecture and study materials easier. Sign in or create a new account to get started.'
   return (
      <>
         <Header content={signInInformation} />
      </>
   )
}
