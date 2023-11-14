import type { Meta, StoryObj } from '@storybook/react';
import { AddCardForm } from '~/entities/add-card-form';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Add card form',
  component: AddCardForm,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    width: '320px',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddCardForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
