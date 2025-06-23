import {Typography} from '@mui/material'

import Button from '../../../atoms/Button'
import Template from '../../../templates/Page/components/Template'

const Fallback = () => (
  <Template className="items-center px-8 text-center" isEmptyPage>
    <Typography className="leading-none" variant="subtitle1">
      Hoppla!
    </Typography>
    <Typography variant="h5">
      Irgendwas ist leider <br />
      schief gelaufen...
    </Typography>
    <Button
      className="mt-2"
      onClick={() => {
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }}
    >
      Seite neu laden
    </Button>
  </Template>
)

export default Fallback
