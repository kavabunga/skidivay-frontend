import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '~/features';
import { imgPromoCards } from '~/shared/mock/img-promo-cards';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: imgPromoCards,
  },
};
