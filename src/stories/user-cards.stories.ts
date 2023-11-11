import type { Meta, StoryObj } from '@storybook/react';
import { UserCards } from '~/widgets';
import { defaultCards } from '~/shared/mock/default-cards';
import { chipsLabels } from '~/shared/mock/chips-labels';

const meta = {
  title: 'Components/User Cards',
  component: UserCards,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserCards>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cards: defaultCards,
    tags: chipsLabels,
    logOut: () => console.log('logout'),
  },
};
