import type {Meta, StoryObj} from '@storybook/react'

import DetailText from '../index'

const meta: Meta<typeof DetailText> = {
  component: DetailText,
  title: 'Atoms/DetailText'
}

export default meta
type Story = StoryObj<typeof DetailText>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {
    children: <div>test</div>,
    heading: 'Test'
  }
}
