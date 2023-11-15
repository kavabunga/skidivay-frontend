import type { Meta, StoryObj } from '@storybook/react';
import { AppFooter } from '~/shared/ui';

const meta = {
  title: 'UI/App Footer',
  component: AppFooter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
