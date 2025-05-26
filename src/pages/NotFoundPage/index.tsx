import {Typography} from '@mui/material'

import PageTemplate from '../../templates/Page'
import {useNavigate} from 'react-router'
import Button from '../../atoms/Button'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <PageTemplate className="items-center mt-[45%] px-8 text-center">
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
    </PageTemplate>
  )
}

export default NotFoundPage
