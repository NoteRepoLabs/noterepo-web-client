/**
 *  2024 - NoteRepo Engineering, Open Source Software
 *  This file is part of the source code which is available online.
 *      - GitHub: https://github.com/NoteRepoLabs/noterepo-web-client
 *      - LICENSE: MIT
 */

'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

/**
 * Responsible for providing the current site theme details.
 * @param children React nodes. 
 * @param props Additional props used to modify behaviour.
 * @returns a theme provider instance.
 */
const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default ThemeProvider
