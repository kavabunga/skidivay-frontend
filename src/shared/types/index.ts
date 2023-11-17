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

export interface ISignInRequest {
  email: string;
  password: string;
}
export interface ISignUpRequest extends ISignInRequest {
  name: string;
  phone_number: string;
}

//NOTE: Owner is not confirmed
export interface IPostCard {
  name: string;
  owner?: {
    username: string;
  };
  shop: number;
  card_number: string;
  barcode_number: string;
}
