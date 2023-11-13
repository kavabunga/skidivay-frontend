import type { Meta, StoryObj } from '@storybook/react';
import { PromoSlider } from '~/features';

const meta = {
  title: 'Components/Slider',
  component: PromoSlider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoggedIn: {
      type: 'boolean',
    },
  },
} satisfies Meta<typeof PromoSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
