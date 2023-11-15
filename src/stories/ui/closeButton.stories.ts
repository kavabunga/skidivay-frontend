import type { Meta, StoryObj } from '@storybook/react';
import { CloseButton } from '~/shared/ui';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'UI/Close Button',
  component: CloseButton,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CloseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
