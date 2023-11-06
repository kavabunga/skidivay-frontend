import type { Meta, StoryObj } from '@storybook/react';
import { AddCardButton } from '~/features';

const meta = {
  title: 'Components/AddCardButton',
  component: AddCardButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AddCardButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Добавить новую карту',
  },
};
