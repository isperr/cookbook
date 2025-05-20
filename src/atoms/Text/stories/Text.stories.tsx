import type {Meta, StoryObj} from '@storybook/react'

import Text from '../index'

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Atoms/Text'
}

export default meta
type Story = StoryObj<typeof Text>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {
    children: <div>test</div>
  }
}
