import {memo} from 'react'
import {Box, IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import {ListDialogProps} from '../../ListDialog/index'

import Field from './Field'

export type ListDialogFieldRowProps = Pick<ListDialogProps, 'type'> & {
  handleRemoveRow: (sectionIndex: number, index: number) => void
  index: number
  sectionIndex: number
}

const FieldRow = ({
  handleRemoveRow,
  index,
  sectionIndex,
  type
}: ListDialogFieldRowProps) => {
  const onRemoveRow = () => {
    handleRemoveRow(sectionIndex, index)
  }
  return (
    <Box className="flex items-start gap-2 -mr-3">
      {type === 'ingredients' && (
        <Field
          fieldType="amount"
          index={index}
          sectionIndex={sectionIndex}
          type={type}
        />
      )}
      <Field
        fieldType="text"
        index={index}
        sectionIndex={sectionIndex}
        type={type}
      />
      <IconButton color="secondary" onClick={onRemoveRow} size="medium">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Box>
  )
}

export default memo(FieldRow)
