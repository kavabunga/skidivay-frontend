import type { Meta, StoryObj } from '@storybook/react';
import { SearchChips } from '~/features';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/SearchChips',
  component: SearchChips,
  decorators: [withRouter],
  tags: ['autodocs'],
  parameters: {
    layout: 'center',
  },
} satisfies Meta<typeof SearchChips>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      { label: 'Все' },
      { label: 'Избранное' },
      { label: 'Продукты' },
      { label: 'Аптеки' },
      { label: 'Одежда и обувь' },
      { label: 'Спорт' },
      { label: 'Товары для дома' },
      { label: 'Канцелярия' },
      { label: 'Бытовая техника' },
      { label: 'Развлечения' },
      { label: 'Другое' },
    ],
  },
};
