'use client'

import {Moon, Sun} from 'lucide-react'
import {useTheme} from '@/components/ThemeProvider'

export function ThemeToggle() {
  const {theme, toggle} = useTheme()

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white/80 text-zinc-700 shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition hover:border-black hover:text-black dark:bg-zinc-900/80 dark:text-zinc-200 dark:border-zinc-700 dark:hover:border-zinc-300"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

