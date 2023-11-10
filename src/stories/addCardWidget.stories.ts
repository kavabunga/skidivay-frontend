import { Meta, StoryObj } from '@storybook/react';
import { AddCardWidget } from '~/widgets/add-card';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Add Card Widget',
  component: AddCardWidget,
  decorators: [withRouter],
  parameters: {
    layout: 'centred',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddCardWidget>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
