import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import {Controller, useFormContext} from 'react-hook-form'
import {RecipeFormFields} from '../../pages/RecipePage/components/EditView'
import DetailText from '../DetailText'

const DurationToggle = () => {
  const {control} = useFormContext<RecipeFormFields>()

  return (
    <DetailText heading="Dauer" isEditMode>
      <Controller
        control={control}
        name="duration"
        render={({field: {onChange, onBlur, value, ref, disabled}}) => (
          <ToggleButtonGroup
            color="primary"
            disabled={disabled}
            value={value}
            exclusive
            onBlur={onBlur}
            onChange={(__, newValue) => {
              if (newValue) {
                onChange(newValue)
              } else {
                onChange('unknown')
              }
            }}
            aria-label="duration"
            size="small"
            ref={ref}
          >
            <ToggleButton value="long" aria-label="long">
              Lang
            </ToggleButton>
            <ToggleButton value="medium" aria-label="medium">
              Mittel
            </ToggleButton>
            <ToggleButton value="short" aria-label="short">
              Kurz
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      />
    </DetailText>
  )
}

export default DurationToggle
