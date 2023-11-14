import type { Meta, StoryObj } from '@storybook/react';
import { PromoSlider } from '~/features';
import { defaultPromoCards } from '~/shared/mock';

const meta = {
  title: 'Components/Carousel',
  component: PromoSlider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoggedIn: {
      type: 'boolean',
      control: 'radio',
    },
  },
} satisfies Meta<typeof PromoSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: defaultPromoCards,
    isLoggedIn: true,
  },
};
