import { Meta, StoryObj } from '@storybook/react';
import { AuthWidget } from '~/widgets/authorization';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Widgets/Auth Widget',
  component: AuthWidget,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    width: '360px',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthWidget>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
