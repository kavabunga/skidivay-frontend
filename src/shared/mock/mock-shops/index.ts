export type ShopListType = {
  id: number;
  group: {
    id: number;
    name: string;
  }[];
  name: string;
  logo: string;
};

export const mockShopList: ShopListType[] = [
  {
    id: 17,
    group: [
      {
        id: 1,
        name: 'Продукты',
      },
    ],
    name: 'Перекрёсток',
    logo: '',
  },
  {
    id: 16,
    group: [
      {
        id: 1,
        name: 'Продукты',
      },
    ],
    name: 'Пятёрочка',
    logo: '',
  },
  {
    id: 12,
    group: [
      {
        id: 1,
        name: 'Продукты',
      },
    ],
    name: 'Магнит',
    logo: '',
  },
  {
    id: 15,
    group: [
      {
        id: 1,
        name: 'Продукты',
      },
    ],
    name: 'Лента',
    logo: '',
  },
  {
    id: 13,
    group: [
      {
        id: 1,
        name: 'Продукты',
      },
    ],
    name: 'METRO',
    logo: '',
  },
  {
    id: 14,
    group: [
      {
        id: 11,
        name: 'Продукты',
      },
    ],
    name: 'KASSIR',
    logo: '',
  },
];
