import { Meta, StoryObj } from '@storybook/react';
import { CardWidget } from '~/widgets/card-widget';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Card Widget',
  component: CardWidget,
  parameters: {
    layout: 'centred',
  },
  decorators: [withRouter],
  tags: ['autodocs'],
  argTypes: {
    shopLogo: {
      options: [
        '',
        'https://gazeta-n1.ru/upload/iblock/b91/qzbsf75ze3omdpowhyk6uu144tp11619.jpg',
      ],
      control: 'radio',
    },
  },
} satisfies Meta<typeof CardWidget>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cardNumber: '1111 1383 0039 3838 49994',
    barcodeNumber: '113839895849854',
    shopLogo:
      'https://gazeta-n1.ru/upload/iblock/b91/qzbsf75ze3omdpowhyk6uu144tp11619.jpg',
    isLiked: false,
  },
};
