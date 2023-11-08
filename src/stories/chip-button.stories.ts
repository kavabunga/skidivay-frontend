import type { Meta, StoryObj } from '@storybook/react';
import { ChipButton } from '~/shared/ui';

const meta = {
  title: 'UI/ChipButton',
  component: ChipButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChipButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'category',
  },
};
