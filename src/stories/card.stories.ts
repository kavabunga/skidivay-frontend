import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '~/entities';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    url: 'https://i.postimg.cc/h42qWNnk/cloth-shoes-01.jpg',
    isLiked: false,
    _id: '0',
    category: 'category',
    name: 'name',
    number: 'number',
  },
};

export const Secondary: Story = {
  args: {
    url: 'https://i.postimg.cc/d3L2tnQj/food-01.png',
    isLiked: true,
    _id: '0',
    category: 'category',
    name: 'name',
    number: 'number',
  },
};

export const NoImg: Story = {
  args: {
    url: undefined,
    isLiked: true,
    _id: '0',
    category: 'category',
    name: '24 часа',
    number: 'number',
  },
};

export const NoImgLongName: Story = {
  args: {
    url: undefined,
    isLiked: false,
    _id: '0',
    category: 'category',
    name: 'Очень длинное название для карточки',
    number: 'number',
  },
};
