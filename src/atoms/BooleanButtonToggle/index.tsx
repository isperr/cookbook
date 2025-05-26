import {useMemo} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {twMerge} from 'tailwind-merge'
import CheckIcon from '@mui/icons-material/Check'
import {ToggleButton} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import {RecipeFormFields} from '../../molecules/RecipeForm/types'
import DetailText from '../DetailText'

export type BooleanButtonToggleProps = {
  heading: string
  type: 'isFavorite' | 'isLowCarb'
}

const BooleanButtonToggle = ({heading, type}: BooleanButtonToggleProps) => {
  const {control} = useFormContext<RecipeFormFields>()
  const isFavorite = useMemo(() => type === 'isFavorite', [type])

  return (
    <DetailText heading={heading} isEditMode>
      <Controller
        control={control}
        name={type}
        render={({
          field: {onChange, onBlur, value: isChecked, ref, disabled}
        }) => (
          <ToggleButton
            color="secondary"
            className={twMerge(
              'size-[43.28px]',
              isChecked && 'border-secondary-light'
            )}
            disabled={disabled}
            value={isChecked}
            selected={isChecked}
            onBlur={onBlur}
            onChange={() => {
              onChange(!isChecked)
            }}
            size="small"
            id={type}
            ref={ref}
          >
            {!isFavorite && <CheckIcon fontSize="small" />}
            {isFavorite && isChecked && <FavoriteIcon fontSize="small" />}
            {isFavorite && !isChecked && (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </ToggleButton>
        )}
      />
    </DetailText>
  )
}

export default BooleanButtonToggle
