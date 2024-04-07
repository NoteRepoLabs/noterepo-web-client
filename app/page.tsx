import { hasCookie } from 'cookies-next'
import { redirect } from 'next/navigation'

export default function Home() {
   if (!hasCookie('authenticated')) {
      redirect('/signin')
   }
   return <h1>Home</h1>
}
