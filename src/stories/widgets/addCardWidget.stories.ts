import { Meta, StoryObj } from '@storybook/react';
import { AddCardWidget } from '~/widgets/add-card';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Widgets/Add Card Widget',
  component: AddCardWidget,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    width: '360px',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddCardWidget>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
