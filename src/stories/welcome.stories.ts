import type { Meta, StoryObj } from '@storybook/react';
import { Welcome } from '~/widgets';

const meta = {
  title: 'Components/Welcome',
  component: Welcome,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Welcome>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      name: 'Петр',
    },
  },
};
