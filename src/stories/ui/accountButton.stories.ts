import type { Meta, StoryObj } from '@storybook/react';
import { AccountButton } from '~/shared/ui';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'UI/Account Button',
  component: AccountButton,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AccountButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
