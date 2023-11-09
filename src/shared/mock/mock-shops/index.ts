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
    id: 1,
    group: [
      {
        id: 1,
        name: 'Продукты',
      },
    ],
    name: 'Пятерочка',
    logo: '',
  },
  {
    id: 3,
    group: [
      {
        id: 3,
        name: 'Красота',
      },
      {
        id: 1,
        name: 'Продукты',
      },
      {
        id: 2,
        name: 'Электроника',
      },
    ],
    name: 'Твой дом',
    logo: '',
  },
];
