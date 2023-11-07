import type { Meta, StoryObj } from '@storybook/react';
import { InfoBar } from '~/features';

const meta = {
  title: 'Components/InfoBar',
  component: InfoBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof InfoBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    message: 'Такая карта уже существует!',
    isError: true,
    isOpen: true,
  },
};

export const Info: Story = {
  args: {
    message: 'Данные обновлены!',
    isError: false,
    isOpen: true,
  },
};
