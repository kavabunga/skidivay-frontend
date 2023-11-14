import type { Meta, StoryObj } from '@storybook/react';
import { CardFull } from '~/entities';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Card Full',
  component: CardFull,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    shopLogo: {
      options: ['', 'https://i.postimg.cc/h42qWNnk/cloth-shoes-01.jpg'],
      control: 'radio',
    },
  },
} satisfies Meta<typeof CardFull>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    _id: '0',
    shopName: 'Пятерочка',
    shopLogo: 'https://i.postimg.cc/h42qWNnk/cloth-shoes-01.jpg',
    isLiked: false,
    barcodeNumber: '923238223892',
    cardNumber: '',
  },
};

export const NoImg: Story = {
  args: {
    _id: '0',
    shopName: '24 часа',
    isLiked: true,
    barcodeNumber: '923238223892',
    cardNumber: '13123123123123123',
  },
};

export const NoImgLongName: Story = {
  args: {
    _id: '0',
    shopName: 'Очень длинное название магазина включающее все подробности',
    isLiked: true,
    barcodeNumber: '923238223892',
    cardNumber: '13123123123123123',
  },
};
