import {memo} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {FormControl, OutlinedInput} from '@mui/material'

import DetailText from '../../../atoms/DetailText'
import {RecipeFormFields} from '../../../pages/RecipePage/components/EditView'

const TitleDetail = () => {
  const {control} = useFormContext<RecipeFormFields>()

  return (
    <DetailText className="flex-1" heading="Titel *" isEditMode>
      <Controller
        control={control}
        name="title"
        rules={{required: true}}
        render={({field: {onBlur, onChange, name, value, ref, disabled}}) => (
          <FormControl required>
            <OutlinedInput
              ref={ref}
              disabled={disabled}
              fullWidth
              id={name}
              onBlur={onBlur}
              onChange={onChange}
              placeholder="Gib hier den Titel des Rezepts an"
              required
              size="small"
              value={value}
            />
          </FormControl>
        )}
      />
    </DetailText>
  )
}

export default memo(TitleDetail)
