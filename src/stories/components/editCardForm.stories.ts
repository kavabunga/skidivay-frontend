import type { Meta, StoryObj } from '@storybook/react';
import { EditCardForm } from '~/entities';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Edit Card Form',
  component: EditCardForm,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    width: '360px',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EditCardForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isActive: true,
    card: {
      card: {
        id: 1,
        shop: {
          id: 1,
          name: 'Пятерочка',
          logo: 'https://i.postimg.cc/h42qWNnk/cloth-shoes-01.jpg',
        },
        name: 'Пятерочка',
        barcode_number: '000000000000',
        card_number: '12323423423423',
        pub_date: '',
      },
      owner: true,
      favourite: false,
      pub_date: '',
    },
  },
};
