import { useEffect } from 'react'

let locks = 0
let previousOverflow = ''

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    if (locks++ === 0) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      window.dispatchEvent(new Event('overlay-scroll-lock'))
    }
    return () => {
      if (--locks === 0) {
        document.body.style.overflow = previousOverflow
        window.dispatchEvent(new Event('overlay-scroll-unlock'))
      }
    }
  }, [active])
}
