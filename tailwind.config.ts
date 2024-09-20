/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

import type { Config } from 'tailwindcss'

const config: Config = {
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      colors: {
         'neutral-900':   '#090A0E',
         'neutral-800':   '#181B26',
         'neutral-700':   '#0D0E13',
         'neutral-600':   '#282C3A',
         'neutral-500':   '#66667B',
         'neutral-300':   '#A1A7B5',
         'neutral-200':   '#DBDBDD',
         'neutral-100':   '#FFFFFF',
         'highlight':     '#282C3A',
         'mod-700':       '#11131A',
         'mod-200':       '#F3F3F3',
         'mod-300':       '#C8C8C8',
         'vibrant-green': '#30F094',
         'vibrant-red':   '#FA4E81',
      },
      extend: {
         fontFamily: {
            sans: ['var(--font-satoshi)'],
         },
      },
   },
   plugins: [],
   darkMode: 'class',
}
export default config
