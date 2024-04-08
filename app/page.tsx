import { redirect } from 'next/navigation'

export default function Home() {
   if (localStorage.getItem('authenticated')) {
      redirect('/signin')
   }
   return <h1>Home</h1>
}
