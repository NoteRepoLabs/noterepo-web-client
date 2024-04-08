import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
   if (!cookies().has('authenticated')) {
      redirect('/signin')
   }
   return <h1>Home</h1>
}
