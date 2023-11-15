import type { Meta, StoryObj } from '@storybook/react';
import { defaultCards } from '~/shared/mock/default-cards';
import { CardsList } from '~/widgets';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Cards List',
  component: CardsList,
  decorators: [withRouter],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CardsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: defaultCards,
  },
};
