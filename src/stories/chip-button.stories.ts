import type { Meta, StoryObj } from '@storybook/react';
import { ChipButton } from '~/shared/ui';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'UI/ChipButton',
  component: ChipButton,
  decorators: [withRouter],
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
