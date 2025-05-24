import {memo, useState} from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import Button from '../../../atoms/Button'
import {useRemoveRecipe} from '../../../hooks/recipe/use-remove'

export type DeleteDialogProps = {
  id: string
  name: string
}

const DeleteDialog = ({id, name}: DeleteDialogProps) => {
  const {handleRemove, isRemoving} = useRemoveRecipe()

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleClick = () => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const handleConfirm = () => {
    handleRemove({closeDialog, id})
  }

  return (
    <>
      <Button color="warning" onClick={handleClick} startIcon={<DeleteIcon />}>
        Löschen
      </Button>

      <Dialog
        open={isDialogOpen || isRemoving}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Rezept löschen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Soll das Rezept <b>{name}</b> wirklich gelöscht werden?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="pb-5 px-6 flex justify-evenly items-center">
          <Button
            fullWidth
            isDisabled={isRemoving}
            onClick={closeDialog}
            variant="outlined"
          >
            Abbrechen
          </Button>
          <Button
            autoFocus
            fullWidth
            isLoading={isRemoving}
            onClick={handleConfirm}
          >
            Löschen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(DeleteDialog)
