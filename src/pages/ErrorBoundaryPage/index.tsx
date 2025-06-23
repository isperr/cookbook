import {ReactNode} from 'react'

// @ts-ignore
import ErrorBoundary from './components/ErrorBoundary'

const ErrorBoundaryPage = ({children}: {children: ReactNode}) => {
  return <ErrorBoundary>{children}</ErrorBoundary>
}
export default ErrorBoundaryPage
