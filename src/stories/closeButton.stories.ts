import type { Meta, StoryObj } from '@storybook/react';
import { CloseButton } from '~/shared/ui';

const meta = {
  title: 'UI/Close Button',
  component: CloseButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof CloseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
