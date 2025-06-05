import {useController, useFormContext} from 'react-hook-form'
import {twMerge} from 'tailwind-merge'
import {FormControl, InputAdornment, OutlinedInput} from '@mui/material'

import {ListDialogFields} from '../../../molecules/RecipeForm/types'

import {ListDialogProps} from '../index'

export type FieldProps = Pick<ListDialogProps, 'type'> & {
  fieldType: 'amount' | 'text'
  index: number
}

const Field = ({fieldType, index, type}: FieldProps) => {
  const {control} = useFormContext<ListDialogFields>()

  const {
    field: {onBlur, onChange, disabled, ref, name, value}
  } = useController({
    name: `${type}Draft.${index}.${fieldType}`,
    control,
    rules: {required: fieldType === 'text'}
  })

  return (
    <FormControl
      className={twMerge(
        fieldType === 'text' && type === 'ingredients' && 'flex-[2]',
        fieldType === 'text' && type === 'instructions' && 'flex-1',
        fieldType === 'amount' && 'sm:flex-[0.5] flex-1'
      )}
      required={fieldType === 'text'}
    >
      <OutlinedInput
        autoFocus={
          (type === 'ingredients' && fieldType === 'amount') ||
          (type === 'instructions' && fieldType === 'text')
        }
        className="items-start"
        disabled={disabled}
        error={!value && fieldType === 'text'}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        required={fieldType === 'text'}
        size="small"
        startAdornment={
          fieldType === 'text' && type === 'instructions' ? (
            <InputAdornment position="start">{index + 1}.</InputAdornment>
          ) : null
        }
        value={value ?? undefined}
        multiline={fieldType === 'text'}
      />
    </FormControl>
  )
}

export default Field
