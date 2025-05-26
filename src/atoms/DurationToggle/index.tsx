import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import {Controller, useFormContext} from 'react-hook-form'
import {RecipeFormFields} from '../../molecules/RecipeForm/types'
import DetailText from '../DetailText'
import {twMerge} from 'tailwind-merge'

const DurationToggle = () => {
  const {control} = useFormContext<RecipeFormFields>()

  return (
    <DetailText heading="Dauer" isEditMode>
      <Controller
        control={control}
        name="duration"
        render={({field: {onChange, onBlur, value, ref, disabled}}) => (
          <ToggleButtonGroup
            className="w-full"
            color="secondary"
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
            <ToggleButton
              fullWidth
              className={twMerge(
                'sm:uppercase xs:normal-case',
                value === 'long' && 'border-secondary-light'
              )}
              value="long"
              aria-label="long"
              size="small"
            >
              Lang
            </ToggleButton>
            <ToggleButton
              fullWidth
              className={twMerge(
                'sm:uppercase xs:normal-case',
                value === 'medium' && 'border-secondary-light'
              )}
              value="medium"
              aria-label="medium"
              size="small"
            >
              Mittel
            </ToggleButton>
            <ToggleButton
              fullWidth
              className={twMerge(
                'sm:uppercase xs:normal-case',
                value === 'short' && 'border-secondary-light'
              )}
              value="short"
              aria-label="short"
              size="small"
            >
              Kurz
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      />
    </DetailText>
  )
}

export default DurationToggle
