import type { Meta, StoryObj } from '@storybook/react';
import { RootLayout } from '~/pages';

const meta = {
  title: 'Pages/RootLayout',
  component: RootLayout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RootLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
