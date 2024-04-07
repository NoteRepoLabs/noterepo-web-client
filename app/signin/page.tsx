import { hasCookie } from 'cookies-next'
import { redirect } from 'next/navigation'

export default function Home() {
   if (hasCookie('authenticated')) {
      redirect('/')
   }
   return <h1>Sign In</h1>
}
