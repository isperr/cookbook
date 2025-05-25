import {Box} from '@mui/material'
import {ReactNode} from 'react'

import DoubleWrapper from '../../atoms/DetailText/components/DoubleWrapper'
import DurationToggle from '../../atoms/DurationToggle'
import BooleanButtonToggle from '../../atoms/BooleanButtonToggle'

import ListDialog from '../ListDialog'
import RatingDetail from './components/RatingDetail'
import TitleDetail from './components/TitleDetail'
import CategoryDetail from './components/CategoryDetail'
import DetailsDetail from './components/DetailsDetail'

export type RecipeFormProps = {
  children: ReactNode
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const RecipeForm = ({children, onSubmit}: RecipeFormProps) => {
  return (
    <Box
      className="flex flex-col gap-4 pb-6"
      component="form"
      onSubmit={onSubmit}
    >
      <Box className="flex items-end gap-2">
        <BooleanButtonToggle heading="Favorit" type="isFavorite" />
        <TitleDetail />
      </Box>

      <DoubleWrapper className="md:grid-cols-2">
        <ListDialog title="Zutaten" type="ingredients" />
        <ListDialog title="Zubereitung" type="instructions" />
      </DoubleWrapper>

      <DoubleWrapper>
        <RatingDetail />
        <BooleanButtonToggle heading="Low Carb" type="isLowCarb" />
        <CategoryDetail />
        <DurationToggle />
      </DoubleWrapper>

      <DetailsDetail />

      {children}
    </Box>
  )
}

export default RecipeForm
