import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';

type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button> & {
  label?: string;
};

const meta: Meta<ButtonPropsAndCustomArgs> = {
  title: 'UI/Button',
  component: Button,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
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
  render: ({ label, ...args }) => <Button {...args}>{label}</Button>,
};

export default meta;
type Story = StoryObj<ButtonPropsAndCustomArgs>;

export const Primary: Story = {
  args: {
    label: 'Войти',
    variant: 'contained',
    disabled: false,
    color: 'primary',
  },
};
export const Secondary: Story = {
  args: {
    label: 'Войти',
    disabled: false,
    variant: 'contained',
    color: 'secondary',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Войти',
    disabled: false,
    variant: 'outlined',
    color: 'primary',
  },
};

export const Text: Story = {
  args: {
    label: 'Войти',
    disabled: false,
    variant: 'text',
    color: 'primary',
  },
};
