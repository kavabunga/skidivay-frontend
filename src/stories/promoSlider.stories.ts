import type { Meta, StoryObj } from '@storybook/react';
import { PromoSlider } from '~/features';
import { defaultPromoCards } from '~/shared/mock';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Carousel',
  component: PromoSlider,
  decorators: [withRouter],
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
