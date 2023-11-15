import { Meta, StoryObj } from '@storybook/react';
import { Home } from '~/widgets';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Home Widget',
  component: Home,
  parameters: {
    layout: 'padded',
  },
  decorators: [withRouter],
  tags: ['autodocs'],
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
