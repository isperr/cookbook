import {createSelector} from '@reduxjs/toolkit'

import {RootState} from '../../../utils/store'

import {RecipeDocumentData, ResolveStateReturnType} from '../types'
import {selectEntities} from '../results/selectors'

// resolve selectors
const selectResolvedIds = (state: RootState) => state.recipeResolve.resolvedIds
export const selectIsResolved = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectResolvedIds(state)],
    resolvedArr => (id ? resolvedArr.includes(id) : false)
  )
const selectResolvingIds = (state: RootState) =>
  state.recipeResolve.resolvingIds
export const selectIsResolving = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectResolvingIds(state)],
    resolvingArr => (id ? resolvingArr.includes(id) : false)
  )
const selectResolveError = (state: RootState) =>
  state.recipeResolve.resolvingError
export const selectHasResolveError = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectResolveError(state)],
    resolveError => (id ? Boolean(resolveError[id]) : false)
  )

export const selectRecipe = (
  id?: string
): ((state: RootState) => RecipeDocumentData | undefined) =>
  createSelector([(state: RootState) => selectEntities(state)], entities =>
    id ? entities[id] : undefined
  )
