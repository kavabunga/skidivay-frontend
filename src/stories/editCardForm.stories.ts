import type { Meta, StoryObj } from '@storybook/react';
import { EditCardForm } from '~/entities';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Edit card form',
  component: EditCardForm,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    width: '320px',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EditCardForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isActive: true,
    cardNumberValue: '1111 1383 0039 3838 49994',
    barcodeNumberValue: '113839895849854',
  },
};
