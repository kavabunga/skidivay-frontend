import type { Meta, StoryObj } from '@storybook/react';
import { SearchLine } from '~/features/search-line/ui';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Search Line',
  component: SearchLine,
  decorators: [withRouter],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    names: ['Дикси', 'Пятёрочка'],
  },
};
