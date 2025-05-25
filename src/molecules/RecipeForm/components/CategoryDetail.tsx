import {memo} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {FormControl, ListSubheader, MenuItem, Select} from '@mui/material'

import DetailText from '../../../atoms/DetailText'
import {selectRecipeCategoryOptions} from '../../../modules/recipe-category/results/selectors'
import {RecipeFormFields} from '../../../pages/RecipePage/components/EditView'
import {useAppSelector} from '../../../utils/store-hooks'

const CategoryDetail = () => {
  const {control} = useFormContext<RecipeFormFields>()
  const options = useAppSelector(selectRecipeCategoryOptions)

  return (
    <DetailText heading="Kategorie *" isEditMode>
      <Controller
        control={control}
        name="category"
        rules={{required: true}}
        render={({field: {onBlur, onChange, name, value, ref, disabled}}) => (
          <FormControl id="category-form" required>
            <Select
              disabled={disabled}
              displayEmpty
              id={name}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              ref={ref}
              size="small"
              renderValue={(selected?: string) => {
                if (!selected) {
                  return <em>Kategorie auswählen</em>
                }

                return (
                  <>
                    {
                      options.find(opt => opt.value === selected.toString())
                        ?.name
                    }
                  </>
                )
              }}
              value={value}
            >
              {options.map(opt => {
                if (opt.isSubheading) {
                  return <ListSubheader>{opt.name}</ListSubheader>
                }
                return <MenuItem value={opt.value}>{opt.name}</MenuItem>
              })}
            </Select>
          </FormControl>
        )}
      />
    </DetailText>
  )
}

export default memo(CategoryDetail)
