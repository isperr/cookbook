import {useForm, FormProvider} from 'react-hook-form'
import type {Meta, StoryObj} from '@storybook/react'

import DurationToggle from '../index'
import {RecipeFormFields} from '../../../pages/RecipePage/components/EditView'

const meta: Meta<typeof DurationToggle> = {
  component: DurationToggle,
  decorators: Story => {
    const methods = useForm<RecipeFormFields>({
      defaultValues: {
        duration: 'unknown'
      }
    })
    return (
      <FormProvider {...methods}>
        <Story />
      </FormProvider>
    )
  },
  title: 'Atoms/DurationToggle'
}

export default meta
type Story = StoryObj<typeof DurationToggle>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {
    isReadOnly: false,
    value: false
  }
}
