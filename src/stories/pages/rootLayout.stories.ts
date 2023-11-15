import type { Meta, StoryObj } from '@storybook/react';
import { RootLayout } from '~/pages';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Pages/Root Layout',
  component: RootLayout,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RootLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
