import {memo} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {FormControl, OutlinedInput} from '@mui/material'

import DetailText from '../../../atoms/DetailText'
import {RecipeFormFields} from '../../../pages/RecipePage/components/EditView'

const DetailsDetail = () => {
  const {control} = useFormContext<RecipeFormFields>()

  return (
    <DetailText heading="Details" isEditMode>
      <Controller
        control={control}
        name="details"
        render={({field: {onBlur, onChange, name, value, ref, disabled}}) => (
          <FormControl fullWidth>
            <OutlinedInput
              ref={ref}
              disabled={disabled}
              id={name}
              minRows={4}
              multiline
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              size="small"
              value={value}
            />
          </FormControl>
        )}
      />
    </DetailText>
  )
}

export default memo(DetailsDetail)
