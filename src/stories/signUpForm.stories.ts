import type { Meta, StoryObj } from '@storybook/react';
import { SignUpForm } from '~/features';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Sign Up form',
  component: SignUpForm,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    width: '320px',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignUpForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
