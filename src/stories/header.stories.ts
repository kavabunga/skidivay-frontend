import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '~/widgets';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isLoggedIn: {
      options: ['Logged', 'Not logged'],
      control: { type: 'boolean' },
    },
    user: {
      control: { type: 'object' },
    },
    type: {
      options: ['standard', 'minimal'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: { user: { name: 'Иван Петрович' }, isLoggedIn: true, type: 'standard' },
};
export const LoggedOut: Story = {
  args: { user: { name: '' }, isLoggedIn: false, type: 'standard' },
};
export const LoggedOutAuth: Story = {
  args: { user: { name: '' }, isLoggedIn: false, type: 'minimal' },
};
