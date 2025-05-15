import type {Meta, StoryObj} from '@storybook/react'

import TestComponent from '../index'

const meta: Meta<typeof TestComponent> = {
  component: TestComponent,
  title: 'Atoms/ActivTestComponentatedChip'
}

export default meta
type Story = StoryObj<typeof TestComponent>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {}
}
