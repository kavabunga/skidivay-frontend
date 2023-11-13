import type { Meta, StoryObj } from '@storybook/react';
import { CardFull } from '~/entities';

const meta = {
  title: 'Components/Card Full',
  component: CardFull,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    shopLogo: {
      options: [
        '',
        'https://gazeta-n1.ru/upload/iblock/b91/qzbsf75ze3omdpowhyk6uu144tp11619.jpg',
      ],
      control: 'radio',
    },
  },
} satisfies Meta<typeof CardFull>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    shopLogo: 'https://i.postimg.cc/h42qWNnk/cloth-shoes-01.jpg',
    isLiked: false,
    _id: '0',
    category: 'category',
    name: 'name',
    barcodeNumber: '923238223892',
    cardNumber: '',
  },
};

export const Secondary: Story = {
  args: {
    shopLogo: 'https://i.postimg.cc/d3L2tnQj/food-01.png',
    isLiked: true,
    _id: '0',
    category: 'category',
    name: 'name',
    barcodeNumber: '923238223892',
    cardNumber: '',
  },
};

export const NoImg: Story = {
  args: {
    shopLogo: undefined,
    isLiked: true,
    _id: '0',
    category: 'category',
    name: '24 часа',
    barcodeNumber: '923238223892',
    cardNumber: '',
  },
};

export const NoImgLongName: Story = {
  args: {
    shopLogo: undefined,
    isLiked: false,
    _id: '0',
    category: 'category',
    name: 'Очень длинное название для карточки',
    barcodeNumber: '923238223892',
    cardNumber: '',
  },
};
