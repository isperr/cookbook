import {useEffect} from 'react'

export const useScrollToTop = (preventScroll?: boolean) => {
  useEffect(() => {
    if (!preventScroll) {
      const body = document.querySelector('body')
      body?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [preventScroll])
}
