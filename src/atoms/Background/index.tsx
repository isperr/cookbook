import {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

const Background = ({children}: {children: ReactNode}) => (
  <div className="relative flex justify-center items-center h-screen">
    <div
      className={twMerge(
        'absolute h-screen w-screen bg-center bg-no-repeat bg-cover',
        'bg-[url(./assets/background.jpg)]'
      )}
    />

    {children}
  </div>
)

export default Background
