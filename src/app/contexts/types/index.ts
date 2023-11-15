export interface ICardContext {
  id?: number;
  name: string;
  shop?: object;
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
  username: string;
  phoneNumber?: string;
  cards: ICardContext[];
}

interface IGroup {
  id: number;
  name: string;
}

export interface IshopListContext {
  id: number;
  name: string;
  logo: string | null;
  group?: IGroup[];
}
