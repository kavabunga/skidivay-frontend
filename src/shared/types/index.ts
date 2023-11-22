export interface ICardContext {
  card: {
    id: number;
    shop?: IShop;
    name: string;
    pub_date?: string;
    image?: string | null;
    card_number?: string;
    barcode_number?: string;
    encoding_type?: string;
    usage_counter?: number;
  };
  owner: boolean;
  favourite: boolean;
}

export interface INewCardResponse {
  id: number;
  shop?: IShop;
  name: string;
  pub_date?: string;
  image?: string | null;
  card_number?: string;
  barcode_number?: string;
  encoding_type?: string;
}

export interface IUserResponse {
  id: number;
  email: string;
  name: string;
  username?: string;
  phoneNumber?: string;
  password?: string;
}

export interface IUserContext extends IUserResponse {
  cards: ICardContext[];
}

interface IGroupType {
  id: number;
  name: string;
}
[];

export interface IShop {
  id: number;
  group?: IGroupType[];
  name: string;
  logo?: string | null;
  color?: string;
  validation?: boolean;
}

export interface IShopListContext extends Array<IShop> {}

export interface ICardsContext extends Array<ICardContext> {}

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest extends ISignInRequest {
  username?: string;
  name: string;
  phone_number: string;
}

export interface ISignInResponse {
  auth_token: string;
}

export interface IPostCard {
  shop: number;
  name: string;
  card_number: string;
  barcode_number: string;
  encoding_type: string;
}
