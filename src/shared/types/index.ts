import { ApiMessageTypes } from '../enums';

export interface ICard {
  id: number;
  shop: IShop;
  image?: string | null;
  name: string;
  pub_date: string;
  card_number?: string;
  barcode_number?: string;
  encoding_type?: string;
}

export interface IShared {
  id: number;
  name: string;
  email: string;
}

export interface ICardContext {
  card: ICard;
  shared_by: IShared | null;
  owner: boolean;
  favourite: boolean;
  pub_date: string;
  usage_counter?: number;
}

export interface IUserResponse {
  id: number;
  email: string;
  name: string;
  username?: string;
  phone_number?: string;
  password?: string;
}

export interface IUserContext extends IUserResponse {
  cards: ICardContext[];
}

export interface IGroup {
  id: number;
  name: string;
}

export interface IShop {
  id: number;
  group?: Array<IGroup>;
  name: string;
  logo?: string | null;
  color?: string;
  validation?: boolean;
}

export interface IShopRequest {
  group?: Array<number>;
  name: string;
  logo?: string | null;
  color?: string;
  validation?: boolean;
}

export interface IShopListContext extends Array<IShop> {}

export interface IGroupListContext extends Array<IGroup> {}

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
  shop: number | IShopRequest;
  name: string;
  card_number?: string;
  barcode_number?: string;
  encoding_type?: string;
}

export interface IPatchCard {
  shop?: number;
  name?: string;
  card_number?: string;
  barcode_number?: string;
  encoding_type?: string;
}

// export interface IPostCardWithShop {
//   shop: {
//     name: string;
//   };
//   name: string;
//   card_number?: string;
//   barcode_number?: string;
//   encoding_type?: string;
// }

export interface IMessageContext {
  message: string;
  type: ApiMessageTypes;
}

export interface IRequestResetPassword {
  phone_last_digits: string;
  email: string;
}

export interface IRequestSetNewPassword {
  uid: string;
  token: string;
  new_password: string;
}

export interface IChangePasswordRequest {
  new_password: string;
  current_password: string;
}

export interface IChangeEmailRequest {
  email: string;
}

export interface IPatchUser {
  name?: string;
  username?: string;
  email?: string;
  phone_number?: string;
}

export interface IDeleteUserRequest {
  current_password: string;
}

export interface IShareCardRequest {
  email: string;
}
