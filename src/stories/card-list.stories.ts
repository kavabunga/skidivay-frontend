import type { Meta, StoryObj } from '@storybook/react';
import { CardsList } from '~/widgets';

const meta = {
  title: 'Components/CardsList',
  component: CardsList,
  tags: ['autodocs'],
  parameters: {
    layout: 'center',
  },
} satisfies Meta<typeof CardsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
