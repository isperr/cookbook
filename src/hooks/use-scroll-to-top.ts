import {useEffect} from 'react'

export const scrollToTop = () => {
  const body = document.querySelector('body')
  body?.scrollIntoView({
    behavior: 'smooth'
  })
}

export const useScrollToTop = (preventScroll?: boolean) => {
  useEffect(() => {
    if (!preventScroll) {
      scrollToTop()
    }
  }, [preventScroll])
}
