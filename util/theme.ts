'use server'

import { cookieStore } from './store'

export const theme = cookieStore.get('app-theme')?.value || 'light'
