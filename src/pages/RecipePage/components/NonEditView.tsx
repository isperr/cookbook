import {memo} from 'react'
import {Box, Typography} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

import DetailList from '../../../atoms/DetailList'
import DoubleWrapper from '../../../atoms/DetailText/components/DoubleWrapper'
import DetailText from '../../../atoms/DetailText'
import StarRating from '../../../atoms/StarRating'
import {selectRecipeData} from '../../../modules/recipe/results/selectors'
import {recipeDurations} from '../../../modules/recipe/types'
import {useAppSelector} from '../../../utils/store-hooks'

const NonEditView = ({id}: {id: string}) => {
  const recipe = useAppSelector(selectRecipeData(id))

  return (
    <Box className="flex flex-col gap-2 pb-6">
      <div className="flex items-center gap-2">
        {recipe.isFavorite && <FavoriteIcon fontSize="medium" color="error" />}
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
          <StarRating isReadOnly value={recipe.rating} />
        </DetailText>
        <DetailText
          heading="Favorit"
          text={recipe.isFavorite ? 'Ja' : 'Nein'}
        />
        <DetailText
          heading="Low Carb"
          text={recipe.isLowCarb ? 'Ja' : 'Nein'}
        />
        <DetailText heading="Dauer" text={recipeDurations[recipe.duration]} />
      </DoubleWrapper>
      <DetailText heading="Details" text={recipe.details || '--'} />
    </Box>
  )
}

export default memo(NonEditView)
