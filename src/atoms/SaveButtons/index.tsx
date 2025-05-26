import {memo, ReactNode, useMemo} from 'react'
import {Box} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import Button from '../Button'

export type SaveButtonsProps = {
  children?: ReactNode
  isDisabled?: boolean
  isLoading?: boolean
  onCancel?: () => void
  onConfirm?: () => void
  type: 'add' | 'enterEdit' | 'leaveEdit'
}

const SaveButtons = ({
  children,
  isDisabled,
  isLoading,
  onCancel,
  onConfirm,
  type
}: SaveButtonsProps) => {
  const cancelButtonText = useMemo(() => {
    if (type === 'enterEdit') {
      return 'Bearbeiten'
    }
    return 'Abbrechen'
  }, [type])
  const cancelIcon = useMemo(() => {
    if (type === 'enterEdit') {
      return <EditIcon />
    }
    return undefined
  }, [type])

  const confirmButtonText = useMemo(() => {
    if (type === 'add') {
      return 'Hinzufügen'
    } else if (type === 'enterEdit') {
      return 'Löschen'
    }
    return 'Speichern'
  }, [type])
  const confirmIcon = useMemo(() => {
    if (type === 'enterEdit') {
      return <DeleteIcon />
    }
    return undefined
  }, [type])

  return (
    <Box className="grid xs:grid-cols-2 grid-cols-1 gap-2 mt-2">
      <Button
        fullWidth
        isDisabled={isLoading || isDisabled}
        onClick={onCancel}
        startIcon={cancelIcon}
        variant={type === 'enterEdit' ? 'contained' : 'outlined'}
      >
        {cancelButtonText}
      </Button>
      <Button
        color={type === 'enterEdit' ? 'warning' : undefined}
        fullWidth
        isDisabled={isDisabled}
        isLoading={isLoading}
        onClick={onConfirm}
        startIcon={confirmIcon}
        type={type === 'enterEdit' ? undefined : 'submit'}
      >
        {confirmButtonText}
      </Button>

      {children}
    </Box>
  )
}

export default memo(SaveButtons)
