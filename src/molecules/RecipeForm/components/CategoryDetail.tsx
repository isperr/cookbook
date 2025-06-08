import {memo} from 'react'
import {Controller, useFormContext} from 'react-hook-form'

import DetailText from '../../../atoms/DetailText'
import {RecipeFormFields} from '../../../molecules/RecipeForm/types'
import CategorySelect from '../../CategorySelect'

const CategoryDetail = () => {
  const {control} = useFormContext<RecipeFormFields>()

  return (
    <DetailText heading="Kategorie *" isEditMode>
      <Controller
        control={control}
        name="category"
        rules={{required: true}}
        render={({field: {onBlur, onChange, name, value, ref, disabled}}) => (
          <CategorySelect
            ref={ref}
            isDisabled={disabled}
            isRequired
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
    </DetailText>
  )
}

export default memo(CategoryDetail)
