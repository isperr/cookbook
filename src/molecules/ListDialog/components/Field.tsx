import {useController, useFormContext} from 'react-hook-form'
import {twMerge} from 'tailwind-merge'
import {FormControl, InputAdornment, OutlinedInput} from '@mui/material'

import {RecipeFormFields} from '../../../pages/RecipePage/components/EditView'

import {ListDialogProps} from '../index'

export type FieldProps = Pick<ListDialogProps, 'type'> & {
  fieldType: 'amount' | 'text'
  index: number
}

const Field = ({fieldType, index, type}: FieldProps) => {
  const {control} = useFormContext<RecipeFormFields>()

  const {
    field: {onBlur, onChange, disabled, ref, name, value}
  } = useController({
    name: `${type}.${index}.${fieldType}`,
    control,
    rules: {required: true}
  })

  return (
    <FormControl
      className={twMerge(
        fieldType === 'text' && type === 'ingredients' && 'col-span-4 flex-[2]',
        fieldType === 'text' && type === 'instructions' && 'col-span-5 flex-1',
        fieldType === 'amount' && 'flex-[0.5]'
      )}
    >
      <OutlinedInput
        autoFocus={
          (type === 'ingredients' && fieldType === 'amount') ||
          (type === 'instructions' && fieldType === 'text')
        }
        disabled={disabled}
        error={!value}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        size="small"
        startAdornment={
          fieldType === 'text' && type === 'instructions' ? (
            <InputAdornment position="start">{index + 1}.</InputAdornment>
          ) : null
        }
        value={value ?? undefined}
      />
    </FormControl>
  )
}

export default Field
