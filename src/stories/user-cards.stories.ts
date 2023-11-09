import type { Meta, StoryObj } from '@storybook/react';
import { UserCards } from '~/widgets';

const meta = {
  title: 'Components/UserCards',
  component: UserCards,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserCards>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
