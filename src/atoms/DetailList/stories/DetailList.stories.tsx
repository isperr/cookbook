import type {Meta, StoryObj} from '@storybook/react'

import DetailList from '../index'

const meta: Meta<typeof DetailList> = {
  component: DetailList,
  title: 'Atoms/DetailList'
}

export default meta
type Story = StoryObj<typeof DetailList>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {
    data: ['test1', 'test2', 'test3'],
    heading: 'Test Überschrift',
    isOrderedList: true,
    noDataText: 'Keine Daten'
  }
}
