import type { Meta, StoryObj } from '@storybook/react';
import { PromoSlider } from '~/features';
import { defaultPromoCards } from '~/shared/mock';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Promo Slider',
  component: PromoSlider,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PromoSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: defaultPromoCards,
  },
};
