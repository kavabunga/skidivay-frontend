import type { Meta, StoryObj } from '@storybook/react';
import { InfoBar } from '~/features';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Info Bar',
  component: InfoBar,
  decorators: [withRouter],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof InfoBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: { isOpen: true },
};
