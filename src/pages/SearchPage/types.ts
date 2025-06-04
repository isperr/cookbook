import {StarRatingNumbers} from '../../atoms/StarRating'
import {RecipeDuration} from '../../modules/recipe/types'

export type SearchFormFields = {
  category?: string
  duration?: RecipeDuration
  isFavorite?: boolean
  isLowCarb?: boolean
  rating?: StarRatingNumbers
  title?: string
}
export const defaultSearchFormFieldsValues: SearchFormFields = {
  category: undefined,
  duration: undefined,
  isFavorite: undefined,
  isLowCarb: undefined,
  rating: undefined,
  title: undefined
}

// title field is always shown by default (but can be left empty on submit)
export type SearchAccordionFields = {
  category: boolean
  duration: boolean
  isFavorite: boolean
  isLowCarb: boolean
  rating: boolean
}
export const defaultSearchAccordionFields: SearchAccordionFields = {
  category: false,
  duration: false,
  isFavorite: false,
  isLowCarb: false,
  rating: false
}
