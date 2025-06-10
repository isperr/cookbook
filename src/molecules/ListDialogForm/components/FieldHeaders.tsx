import {memo} from 'react'
import {twMerge} from 'tailwind-merge'
import {Box} from '@mui/material'

import Text from '../../../atoms/Text'

import {ListDialogProps} from '../../ListDialog/index'

const FieldHeaders = ({type}: Pick<ListDialogProps, 'type'>) => (
  <Box className="flex">
    {type === 'ingredients' && (
      <Text className="sm:flex-[0.207] flex-[0.355]" type="label">
        Menge
      </Text>
    )}
    <Text className={twMerge(type === 'ingredients' && '')} type="label">
      {type === 'ingredients' ? 'Zutat' : 'Schritt'} *
    </Text>
  </Box>
)

export default memo(FieldHeaders)
