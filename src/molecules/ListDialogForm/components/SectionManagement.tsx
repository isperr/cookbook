import {memo, useMemo} from 'react'
import {useController, useFormContext} from 'react-hook-form'
import {isUndefined} from 'lodash'
import {FormControl, OutlinedInput} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import {useDialogs} from '@toolpad/core/useDialogs'

import Button from '../../../atoms/Button'

import {ListDialogFields} from '../../RecipeForm/types'
import {ListDialogProps} from '../../ListDialog/index'
import DetailText from '../../../atoms/DetailText'

export type ListDialogSectionManagementProps = Pick<ListDialogProps, 'type'> & {
  sectionIndex?: number
  handleAdd?: (sectionName: string | null) => void
  handleRemove?: (sectionIndex: number) => void
}
export type FieldNames =
  | 'sectionTitle'
  | `ingredientsDraft.${number}.name`
  | `instructionsDraft.${number}.name`

const SectionManagement = ({
  handleAdd,
  handleRemove,
  sectionIndex,
  type
}: ListDialogSectionManagementProps) => {
  const dialogs = useDialogs()

  const hasSectionIndex = !isUndefined(sectionIndex)
  const fieldName = useMemo(
    () =>
      (hasSectionIndex
        ? `${type}Draft.${sectionIndex}.name`
        : 'sectionTitle') as FieldNames,
    [hasSectionIndex, sectionIndex, type]
  )

  const {control, resetField} = useFormContext<ListDialogFields>()
  const {
    field: {ref, disabled, name, onBlur, onChange, value}
  } = useController({
    name: fieldName,
    control,
    rules: {
      required: hasSectionIndex
    }
  })

  const onAddSection = () => {
    handleAdd?.(value)
    resetField(fieldName)
  }

  const onRemoveSection = async () => {
    if (!hasSectionIndex) {
      return
    }

    const isConfirmed = await dialogs.confirm(
      'Bist du dir sicher, dass du den Abschnit entfernen möchtest?',
      {
        okText: 'Ja, entfernen',
        cancelText: 'Abbrechen',
        title: 'Abschnitt entfernen'
      }
    )

    if (isConfirmed) {
      handleRemove?.(sectionIndex)
    }
  }

  return (
    <>
      <DetailText heading="Abschnitt-Name" isEditMode>
        <FormControl fullWidth>
          <OutlinedInput
            ref={ref}
            disabled={disabled}
            error={hasSectionIndex && !value}
            fullWidth
            id={name}
            onBlur={onBlur}
            onChange={onChange}
            placeholder="Abschnitt-Name"
            required={hasSectionIndex}
            size="small"
            value={value ?? ''}
          />
        </FormControl>
      </DetailText>
      {hasSectionIndex && sectionIndex > 0 && (
        <Button
          color="error"
          onClick={onRemoveSection}
          size="small"
          startIcon={<DeleteIcon />}
        >
          Abschnitt entfernen
        </Button>
      )}
      {!hasSectionIndex && (
        <Button
          color="secondary"
          onClick={onAddSection}
          size="small"
          startIcon={<AddIcon />}
        >
          Abschnitt hinzufügen
        </Button>
      )}
    </>
  )
}

export default memo(SectionManagement)
