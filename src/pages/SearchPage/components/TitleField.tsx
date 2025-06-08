import {useController, useFormContext} from 'react-hook-form'

import {SearchFormFields} from '../types'
import {FormControl, OutlinedInput} from '@mui/material'

const TitleField = () => {
  const {control} = useFormContext<SearchFormFields>()
  const {
    field: {onBlur, onChange, disabled, ref, value}
  } = useController({
    name: 'title',
    control,
    rules: {required: false}
  })

  return (
    <FormControl>
      <OutlinedInput
        ref={ref}
        disabled={disabled}
        fullWidth
        id="title"
        onBlur={onBlur}
        onChange={onChange}
        placeholder="Gib hier den Titel des Rezepts an"
        size="small"
        value={value ?? ''}
      />
    </FormControl>
  )
}

export default TitleField
