import type { Meta, StoryObj } from '@storybook/react';
import { SignInForm } from '~/features';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Sign In form',
  component: SignInForm,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    width: '360px',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignInForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
