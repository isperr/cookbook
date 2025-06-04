import {Controller, useFormContext} from 'react-hook-form'
import {RecipeFormFields} from '../../molecules/RecipeForm/types'
import DetailText from '../DetailText'
import Component from './components/Component'

const DurationToggle = () => {
  const {control} = useFormContext<RecipeFormFields>()

  return (
    <DetailText heading="Dauer" isEditMode>
      <Controller
        control={control}
        name="duration"
        render={({field: {onChange, onBlur, value, ref, disabled}}) => (
          <Component
            ref={ref}
            disabled={disabled}
            isSearch={false}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
    </DetailText>
  )
}

export default DurationToggle
