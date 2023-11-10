import type { Meta, StoryObj } from '@storybook/react';
import { CardWidget } from '~/widgets/card/index.tsx';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Pages/Added Card',
  component: CardWidget,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withRouter],
  tags: ['autodocs'],
} satisfies Meta<typeof CardWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 1,
    name: 'Пятёрочка',
    cardNumber: '1111 1383 0039 3838 49994',
    barcodeNumber: 113839895849854,
  },
};
