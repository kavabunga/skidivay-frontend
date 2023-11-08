import { Meta, StoryObj } from '@storybook/react';
import { AuthWidget } from '~/widgets/authorization';

const meta = {
  title: 'Components/Auth Widget',
  component: AuthWidget,
  parameters: {
    layout: 'centred',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthWidget>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
