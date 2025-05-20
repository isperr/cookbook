import type {Meta, StoryObj} from '@storybook/react'

import StarRating from '../index'

const meta: Meta<typeof StarRating> = {
  component: StarRating,
  title: 'Atoms/StarRating'
}

export default meta
type Story = StoryObj<typeof StarRating>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {
    isReadOnly: false,
    value: 3
  }
}
