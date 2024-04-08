import { cookieStore } from '@/util/store'
import { redirect } from 'next/navigation'

export default function Home() {
   if (!cookieStore.has('authenticated')) {
      redirect('/signin')
   }
   return <h1>Home</h1>
}
