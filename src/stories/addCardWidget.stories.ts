import { Meta, StoryObj } from '@storybook/react';
import { AddCardWidget } from '~/widgets/add-card';

const meta = {
  title: 'Components/Add Card Widget',
  component: AddCardWidget,
  parameters: {
    layout: 'centred',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddCardWidget>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
