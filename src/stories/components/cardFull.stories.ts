import type { Meta, StoryObj } from '@storybook/react';
import { CardFull } from '~/entities';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Card Full',
  component: CardFull,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    width: '360px',
  },
  tags: ['autodocs'],
  argTypes: {
    item: {
      card: {
        id: { type: 'number' },
        shop: {
          id: { type: 'number' },
          name: 'string',
          logo: {
            type: 'string',
            options: ['', 'https://i.postimg.cc/h42qWNnk/cloth-shoes-01.jpg'],
            control: 'radio',
          },
        },
        barcode_number: 'string',
        card_number: 'string',
      },
      owner: { control: 'boolean' },
      favourite: { control: 'boolean' },
    },
  },
} satisfies Meta<typeof CardFull>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    item: {
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

export const NoImg: Story = {
  args: {
    item: {
      card: {
        id: 1,
        shop: {
          id: 1,
          name: 'Магазин 24 часа',
          logo: '',
        },
        name: 'Магазин 24 часа',
        barcode_number: '000000000000',
        card_number: '12323423423423',
        pub_date: '',
      },
      owner: false,
      favourite: true,
      shared_by: { name: 'Василий', email: '123@321.com', id: 0 },
      pub_date: '',
    },
  },
};
