import type { Meta, StoryObj } from '@storybook/react';
import { Home } from '~/widgets';

const meta = {
  title: 'Components/Home',
  component: Home,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
