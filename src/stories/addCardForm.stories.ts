import type { Meta, StoryObj } from '@storybook/react';
import { AddCardForm } from '~/entities/add-card-form';

const meta = {
  title: 'Components/Add card form',
  component: AddCardForm,
  parameters: {
    layout: 'centered',
    width: '320px',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AddCardForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
