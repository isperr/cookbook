import ErrorBoundaryPage from '../../pages/ErrorBoundaryPage'
import Template, {PageTemplateProps} from './components/Template'

const PageTemplate = ({
  children,
  className
}: Omit<PageTemplateProps, 'isEmptyPage'>) => (
  <ErrorBoundaryPage>
    <Template className={className}>{children}</Template>
  </ErrorBoundaryPage>
)

export default PageTemplate
