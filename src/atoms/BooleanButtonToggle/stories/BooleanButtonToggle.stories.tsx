import {FormProvider, useForm} from 'react-hook-form'
import type {Meta, StoryObj} from '@storybook/react'

import {RecipeFormFields} from '../../../molecules/RecipeForm/types'
import BooleanButtonToggle from '../index'

const meta: Meta<typeof BooleanButtonToggle> = {
  component: BooleanButtonToggle,
  decorators: Story => {
    const methods = useForm<RecipeFormFields>({
      defaultValues: {
        isFavorite: false,
        isLowCarb: false
      }
    })
    return (
      <FormProvider {...methods}>
        <Story />
      </FormProvider>
    )
  },
  title: 'Atoms/BooleanButtonToggle'
}

export default meta
type Story = StoryObj<typeof BooleanButtonToggle>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {
    heading: 'Test',
    type: 'isFavorite'
  }
}
