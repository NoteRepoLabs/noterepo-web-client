import { cookieStore } from '@/util/store'
import localFont from 'next/font/local'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
   title: 'NoteRepo',
   description:
      'A collaborative effort to make sharing lecture materials easier.',
   icons: {
      shortcut: '/shortcut-icon.svg',
   },
}

const satoshi = localFont({
   src: [
      { path: '../public/fonts/satoshi/Satoshi-Black.woff', weight: '900' },
      { path: '../public/fonts/satoshi/Satoshi-Bold.woff', weight: '800' },
      { path: '../public/fonts/satoshi/Satoshi-Medium.woff', weight: '700' },
      {
         path: '../public/fonts/satoshi/Satoshi-Regular.woff',
         weight: '600',
      },
      { path: '../public/fonts/satoshi/Satoshi-Light.woff', weight: '500' },
   ],
   variable: '--font-satoshi',
})

export const theme = cookieStore.get('app-theme')?.value || 'light'

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en" className={theme}>
         <body className={`${satoshi.variable} font-sans`}>{children}</body>
      </html>
   )
}
