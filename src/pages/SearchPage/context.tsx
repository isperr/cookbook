import {createContext, Dispatch, SetStateAction, useContext} from 'react'

import {defaultSearchAccordionFields, SearchAccordionFields} from './types'

export type SearchPageContextType = {
  expanded: SearchAccordionFields
  setExpanded: Dispatch<SetStateAction<SearchAccordionFields>>
}
const defaultSearchPageContextState = {
  expanded: defaultSearchAccordionFields,
  setExpanded: () => {}
}
export const SearchPageContext = createContext<SearchPageContextType>(
  defaultSearchPageContextState
)

export const useSearchPageContext = (): SearchPageContextType =>
  useContext<SearchPageContextType>(SearchPageContext)
