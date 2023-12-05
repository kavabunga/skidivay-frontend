import type { Meta, StoryObj } from '@storybook/react';
import { RegistrationSuccessWidget } from '~/widgets';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Widgets/Registration Success',
  component: RegistrationSuccessWidget,
  decorators: [withRouter],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RegistrationSuccessWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
