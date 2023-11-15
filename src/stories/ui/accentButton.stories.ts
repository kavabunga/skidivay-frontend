import type { Meta, StoryObj } from '@storybook/react';
import { AccentButton } from '~/shared/ui';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'UI/Accent Button',
  component: AccentButton,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      name: ' label',
      control: { type: 'text' },
    },
    variant: {
      options: ['outlined', 'contained', 'text'],
      control: { type: 'radio' },
    },
    color: {
      options: ['primary', 'secondary', 'info', 'error', 'surface'],
      control: { type: 'radio' },
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AccentButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Добавить карту',
    variant: 'contained',
    disabled: false,
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Добавить карту',
    disabled: false,
    variant: 'contained',
    color: 'secondary',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Добавить карту',
    disabled: false,
    variant: 'outlined',
    color: 'primary',
  },
};

export const Text: Story = {
  args: {
    children: 'Добавить карту',
    disabled: false,
    variant: 'text',
    color: 'primary',
  },
};
