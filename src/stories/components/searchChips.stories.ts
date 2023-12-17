import type { Meta, StoryObj } from '@storybook/react';
import { SearchChips } from '~/features';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Search Chips',
  component: SearchChips,
  decorators: [withRouter],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchChips>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    filterBy: 'chips',
    onFilter: (value) => console.log(value),
  },
};
