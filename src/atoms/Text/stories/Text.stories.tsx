import type {Meta, StoryObj} from '@storybook/react'

import Button from '../index'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Atoms/Button'
}

export default meta
type Story = StoryObj<typeof Button>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {
    children: <div>test</div>
  }
}
