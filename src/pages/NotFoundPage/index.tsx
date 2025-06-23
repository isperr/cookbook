import {Typography} from '@mui/material'

import Template from '../../templates/Page/components/Template'
import {useNavigate} from 'react-router'
import Button from '../../atoms/Button'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <Template className="items-center px-8 text-center" isEmptyPage>
      <Typography className="leading-none" variant="subtitle1">
        404
      </Typography>
      <Typography variant="h5">
        Hoppla! <br />
        Seite nicht gefunden.
      </Typography>
      <Button className="mt-2" onClick={handleClick}>
        Zurück zur Homepage
      </Button>
    </Template>
  )
}

export default NotFoundPage
