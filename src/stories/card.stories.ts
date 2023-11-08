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
    card: {
      url: 'https://i.postimg.cc/h42qWNnk/cloth-shoes-01.jpg',
      isLiked: false,
    },
  },
};

export const Secondary: Story = {
  args: {
    card: {
      url: 'https://i.postimg.cc/d3L2tnQj/food-01.png',
      isLiked: true,
    },
  },
};
