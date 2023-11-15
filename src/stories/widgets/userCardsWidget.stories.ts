import type { Meta, StoryObj } from '@storybook/react';
import { UserCards } from '~/widgets';
import { defaultCards } from '~/shared/mock/default-cards';
import { chipsLabels } from '~/shared/mock/chips-labels';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Widgets/User Cards',
  component: UserCards,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserCards>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cards: defaultCards,
    tags: chipsLabels,
    logOut: () => {},
  },
};
