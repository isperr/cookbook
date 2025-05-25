import {memo} from 'react'
import {Box, Typography} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import Button from '../../../atoms/Button'
import DetailList from '../../../atoms/DetailList'
import DoubleWrapper from '../../../atoms/DetailText/components/DoubleWrapper'
import DetailText from '../../../atoms/DetailText'
import RecipeFavorite from '../../../atoms/RecipeFavorite'
import StarRating from '../../../atoms/StarRating'
import {useRecipeWithCategoryName} from '../../../hooks/recipe-category/use-recipe-with-category-name'
import {recipeDurations} from '../../../modules/recipe/types'

import {useToggleEditMode} from '../hooks/use-toggle-edit-mode'
import DeleteDialog from './DeleteDialog'

const NonEditView = ({id}: {id: string}) => {
  const recipe = useRecipeWithCategoryName(id, true)
  const {enterEditMode} = useToggleEditMode()

  return (
    <Box className="flex flex-col gap-2 pb-6">
      <div className="flex items-center gap-2">
        <RecipeFavorite value={recipe.isFavorite} />
        <Typography variant="h5">{recipe.title}</Typography>
      </div>
      <DetailList
        data={recipe.ingredients}
        heading="Zutaten"
        noDataText="Es wurden leider keine Zutaten angegeben."
        isOrderedList={false}
      />
      <DetailList
        data={recipe.instructions}
        heading="Zubereitung"
        noDataText="Die Zubereitung wurde leider nicht angegeben."
        isOrderedList
      />
      <DoubleWrapper>
        <DetailText heading="Rating">
          <StarRating
            defaultValue={recipe.rating}
            isDisabled={false}
            isReadOnly
            name="rating"
            value={undefined}
          />
        </DetailText>
        <DetailText
          heading="Low Carb"
          text={recipe.isLowCarb ? 'Ja' : 'Nein'}
        />
        <DetailText heading="Kategorie" text={recipe.categoryName} />
        <DetailText heading="Dauer" text={recipeDurations[recipe.duration]} />
      </DoubleWrapper>
      <DetailText heading="Details" text={recipe.details || '--'} />

      <Box className="grid xs:grid-cols-2 grid-cols-1 gap-2">
        <Button onClick={enterEditMode} startIcon={<EditIcon />}>
          Bearbeiten
        </Button>
        <DeleteDialog id={id} name={recipe.title} />
      </Box>
    </Box>
  )
}

export default memo(NonEditView)
