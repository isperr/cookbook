import type {Meta, StoryObj} from '@storybook/react'

import RecipeFavorite from '../index'

const meta: Meta<typeof RecipeFavorite> = {
  component: RecipeFavorite,
  title: 'Atoms/RecipeFavorite'
}

export default meta
type Story = StoryObj<typeof RecipeFavorite>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {
    value: false
  }
}
