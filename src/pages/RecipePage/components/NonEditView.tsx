import {memo, useState} from 'react'
import {Box, Typography} from '@mui/material'

import DetailList from '../../../atoms/DetailList'
import DoubleWrapper from '../../../atoms/DetailText/components/DoubleWrapper'
import DetailText from '../../../atoms/DetailText'
import RecipeFavorite from '../../../atoms/RecipeFavorite'
import SaveButtons from '../../../atoms/SaveButtons'
import StarRating from '../../../atoms/StarRating'
import {useRecipeWithCategoryName} from '../../../hooks/recipe-category/use-recipe-with-category-name'
import {selectCanEdit} from '../../../modules/auth/selectors'
import {recipeDurations} from '../../../modules/recipe/types'
import {useAppSelector} from '../../../utils/store-hooks'

import {useToggleEditMode} from '../hooks/use-toggle-edit-mode'
import DeleteDialog from './DeleteDialog'

const NonEditView = ({id}: {id: string}) => {
  const canEdit = useAppSelector(selectCanEdit)
  const recipe = useRecipeWithCategoryName(id)
  const {enterEditMode} = useToggleEditMode()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true)
  }

  return (
    <Box className="flex flex-col gap-2 pb-6">
      <div className="flex items-center gap-2">
        <RecipeFavorite value={recipe.isFavorite} />
        <Typography variant="h5">{recipe.title}</Typography>
      </div>
      <DetailList
        heading="Zutaten"
        isOrderedList={false}
        noDataText="Es wurden leider keine Zutaten angegeben."
        sections={recipe.ingredients}
        type="ingredients"
      />
      <DetailList
        heading="Zubereitung"
        isOrderedList
        noDataText="Die Zubereitung wurde leider nicht angegeben."
        sections={recipe.instructions}
        type="instructions"
      />
      <DoubleWrapper>
        <DetailText heading="Kategorie" text={recipe.categoryName} />
        <DetailText heading="Dauer" text={recipeDurations[recipe.duration]} />
        <DetailText heading="Bewertung">
          <StarRating
            isDisabled={false}
            isReadOnly
            name="rating"
            value={recipe.rating}
          />
        </DetailText>
        <DetailText
          heading="Low Carb"
          text={recipe.isLowCarb ? 'Ja' : 'Nein'}
        />
      </DoubleWrapper>
      <DetailText heading="Details" text={recipe.details || '--'} />

      {canEdit && (
        <SaveButtons
          onCancel={enterEditMode}
          onConfirm={openDeleteDialog}
          type="enterEdit"
        >
          <DeleteDialog
            id={id}
            isDialogOpen={isDeleteDialogOpen}
            name={recipe.title}
            setIsDialogOpen={setIsDeleteDialogOpen}
          />
        </SaveButtons>
      )}
    </Box>
  )
}

export default memo(NonEditView)
