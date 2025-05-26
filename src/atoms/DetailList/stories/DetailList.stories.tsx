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
    data: [
      {amount: 'a', text: 'test1'},
      {amount: 'b', text: 'test2'},
      {amount: 'c', text: 'test3'}
    ],
    heading: 'Test Überschrift',
    isOrderedList: true,
    noDataText: 'Keine Daten'
  }
}
