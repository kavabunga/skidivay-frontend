import type { Meta, StoryObj } from '@storybook/react';
import { SignUpForm } from '~/features';

const meta = {
  title: 'Components/Sign Up form',
  component: SignUpForm,
  parameters: {
    layout: 'centered',
    width: '320px',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignUpForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
