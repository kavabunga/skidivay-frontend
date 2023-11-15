import type { Meta, StoryObj } from '@storybook/react';
import { AddCardButton } from '~/features';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Add Card Button',
  component: AddCardButton,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    width: '360px',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AddCardButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Добавить новую карту',
  },
};
