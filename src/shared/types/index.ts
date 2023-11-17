export interface ICardContext {
  id?: number;
  name: string;
  shop?: IShop;
  imageCard?: string;
  cardNumber?: string;
  barcodeNumber?: string;
  // Скорее всего строка, для которой нужно будет
  // написать утилити функцию для перевода в формат,
  // удобный для юзера
  pubDate?: string;
  // Точно стоит уточнить, нужны ли они нам
  owner?: string;
  group?: number[];
}

export interface IUserContext {
  id: number;
  email: string;
  name: string;
  phoneNumber?: string;
  cards: ICardContext[];
}

interface IGroupType {
  id: number;
  name: string;
}

export interface IShop {
  id: number;
  name: string;
  logo?: string | null;
  color?: string;
  validation?: boolean;
  group?: IGroupType[];
}

export interface IShopListContext extends Array<IShop> {}

export interface ICardsContext extends Array<ICardContext> {}

export interface CardProps extends ICardContext {
  isLiked: boolean;
}
