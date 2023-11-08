import type { Meta, StoryObj } from '@storybook/react';
import { AddedCard } from '~/pages/AddedCard';

const meta = {
  title: 'Pages/Added Card',
  component: AddedCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddedCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Пятёрочка',
    cardNumber: '1111 1383 0039 3838 49994',
    barcodeNumber: 113839895849854,
  },
};
