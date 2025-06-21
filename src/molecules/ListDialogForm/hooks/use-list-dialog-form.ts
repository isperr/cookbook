import {useMemo, useState} from 'react'
import {useFieldArray, useFormContext, useWatch} from 'react-hook-form'
import {useNotifications} from '@toolpad/core'

import {
  IngredientsDataType,
  IngredientsType,
  InstructionsDataType,
  InstructionsType
} from '../../../modules/recipe/types'
import {getToastConfig} from '../../../utils/get-toast-config'

import {ListDialogFields} from '../../RecipeForm/types'
import {ListDialogFormProps} from '..'

export const EMPTY = '---REMOVED---'
export type useListDialogFormProps = Pick<
  ListDialogFormProps,
  'handleConfirm' | 'type'
> & {
  defaultHasSections: boolean
}

export const useListDialogForm = ({
  defaultHasSections,
  handleConfirm,
  type
}: useListDialogFormProps) => {
  const notifications = useNotifications()
  const {control, setValue} = useFormContext<ListDialogFields>()

  const {fields, append, remove, update} = useFieldArray({
    control,
    name: `${type}Draft`
  })
  const watchValue = useWatch({
    name: `${type}Draft`,
    control
  })
  const isInvalid = useMemo(
    () =>
      watchValue.some(({data}) => data?.some(it => !it.text)) ||
      (watchValue.length > 1 && watchValue.some(({name}) => !name)),
    [watchValue]
  )

  // confirm FORM management ------------------------------------
  const onConfirm = () => {
    if (isInvalid) {
      notifications.show(
        'Fülle alle Felder erforderlichen Felder aus oder entferne die Zeile/den Abschnitt mit dem Fehler.',
        getToastConfig({})
      )
    } else {
      // filter out rows with EMPTY filler
      const filtered = watchValue.map(({data, name}) => {
        return {
          data: data.filter(it => it.text !== EMPTY),
          name: name
        }
      })
      handleConfirm(
        type === 'ingredients'
          ? (filtered as IngredientsType)
          : (filtered as InstructionsType)
      )
    }
  }

  // SECTION management ------------------------------------
  const [hasSections, setHasSections] = useState<boolean>(defaultHasSections)
  const handleHasSectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hasSectionsNew = event.target.checked

    if (!hasSectionsNew) {
      // remove all extra sections
      watchValue.forEach((__, index) => {
        if (index > 0) {
          remove(index)
        }
      })
      // reset title for only section left
      if (watchValue[0].name) {
        setValue(`${type}Draft.0.name`, null)
      }
    }

    setHasSections(hasSectionsNew)
  }

  const handleAddSection = (sectionName: string | null) => {
    append({data: [], name: sectionName})
  }

  const handleRemoveSection = (sectionIndex: number) => {
    remove(sectionIndex)
  }

  // ROW management ------------------------------------
  const handleAddRow = (sectionIndex: number) => {
    const currentValue = watchValue[sectionIndex]
    const updated = [
      ...currentValue.data,
      {
        amount: type === 'instructions' ? null : '',
        text: ''
      }
    ]

    if (type === 'ingredients') {
      update(sectionIndex, {
        name: currentValue.name,
        data: updated as IngredientsDataType
      })
    } else {
      update(sectionIndex, {
        name: currentValue.name,
        data: updated as InstructionsDataType
      })
    }
  }

  const handleRemoveRow = (sectionIndex: number, index: number) => {
    const currentValue = watchValue[sectionIndex]
    const updated = currentValue.data.map((val, idx) => {
      if (idx === index) {
        return {amount: null, text: EMPTY}
      }
      return val
    })

    if (type === 'ingredients') {
      update(sectionIndex, {
        name: currentValue.name,
        data: updated as IngredientsDataType
      })
    } else {
      update(sectionIndex, {
        name: currentValue.name,
        data: updated as InstructionsDataType
      })
    }
  }

  return {
    fields,
    hasSections,
    handleAddRow,
    handleAddSection,
    handleHasSectionChange,
    handleRemoveRow,
    handleRemoveSection,
    isInvalid,
    onConfirm
  }
}
