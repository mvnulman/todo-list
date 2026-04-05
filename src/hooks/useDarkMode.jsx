import { useState, useEffect, useCallback } from 'react'

const THEME_KEY = 'todo-dark-mode'

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem(THEME_KEY, dark) } catch {}
  }, [dark])

  const toggle = useCallback(() => setDark(prev => !prev), [])

  return { dark, toggle }
}
