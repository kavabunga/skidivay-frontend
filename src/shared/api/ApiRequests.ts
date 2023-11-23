import {
  ICardContext,
  ICardsContext,
  INewCardResponse,
  IPatchCard,
  IPostCard,
  IShop,
  IShopListContext,
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
  IUserContext,
  IUserResponse,
  MEDIA_URL,
} from '..';

interface IRequestOptions {
  headers: HeadersInit;
  method: string;
  body?: BodyInit;
  credentials?: RequestCredentials;
}

//NOTE: SignOut and Remove card have no body in response
interface IApiRequests {
  _url: string;
  _headers: HeadersInit;
  _requestApi: (url: string, options: IRequestOptions) => void;
  signUp(data: ISignUpRequest): Promise<IUserResponse>;
  signIn(data: ISignInRequest): Promise<ISignInResponse>;
  signOut(): Promise<Response>;
  getUser(): Promise<IUserContext>;
  getShops(): Promise<IShopListContext>;
  getCards(): Promise<ICardsContext>;
  postCard(data: IPostCard): Promise<INewCardResponse>;
  editCard(data: IPatchCard, id: number): Promise<ICardContext>;
  changeCardLikeStatus(id: number, hasLike: boolean): Promise<ICardContext>;
  deleteCard(id: number): Promise<Response>;
}

interface IApiRequestsConstructor {
  new (url: string): IApiRequests;
}

export const ApiRequests: IApiRequestsConstructor = class ApiRequests
  implements IApiRequests
{
  _url: string;
  _headers: HeadersInit;
  constructor(url: string) {
    this._url = url;
    this._headers = {
      'Content-Type': 'application/json',
    };
  }

  _requestApi(url: string, options: IRequestOptions) {
    if (localStorage.getItem('token')) {
      options.headers = {
        ...options.headers,
        authorization: `Token ${localStorage.getItem('token') || ''}`,
      };
    }
    return fetch(`${url}`, options)
      .then((res) =>
        res.ok
          ? res
          : res.json().then((res) => Promise.reject(new Error(res.message)))
      )
      .then((res) => {
        try {
          return res.json();
        } catch (err) {
          console.log(err);
          return res;
        }
      });
  }

  signUp(data: ISignUpRequest) {
    const url = `${this._url}/users/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options);
  }

  signIn(data: ISignInRequest) {
    const url = `${this._url}/auth/token/login/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options);
  }

  signOut() {
    const url = `${this._url}/auth/token/logout/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
    };
    return this._requestApi(url, options);
  }

  getUser() {
    const url = `${this._url}/users/me/`;
    const options: IRequestOptions = {
      method: 'GET',
      headers: this._headers,
    };
    return this._requestApi(url, options);
  }

  getShops() {
    const url = `${this._url}/shops/`;
    const options: IRequestOptions = {
      method: 'GET',
      headers: this._headers,
    };
    return this._requestApi(url, options).then((res) =>
      res.map((item: IShop) => {
        item.logo = MEDIA_URL + item.logo;
        return item;
      })
    );
  }

  getCards() {
    const url = `${this._url}/cards/`;
    const options: IRequestOptions = {
      method: 'GET',
      headers: this._headers,
    };
    return this._requestApi(url, options).then((res) =>
      res.map((item: ICardContext) => {
        item.card.shop &&
          (item.card.shop.logo = MEDIA_URL + item.card.shop.logo);
        return item;
      })
    );
  }

  postCard(data: IPostCard) {
    const url = `${this._url}/cards/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options).then((res: INewCardResponse) => {
      res.shop && (res.shop.logo = MEDIA_URL + res.shop.logo);
      return res;
    });
  }

  editCard(data: IPatchCard, id: number) {
    const url = `${this._url}/cards/${id.toString()}`;
    const options: IRequestOptions = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options).then((res: ICardContext) => {
      res.card.shop && (res.card.shop.logo = MEDIA_URL + res.card.shop.logo);
      return res;
    });
  }

  changeCardLikeStatus(id: number, hasLike: boolean) {
    const url = `${this._url}/cards/${id.toString()}/favorite/`;
    const method = hasLike ? 'POST' : 'DELETE';
    const options: IRequestOptions = {
      method: method,
      headers: this._headers,
    };
    return this._requestApi(url, options).then((res: ICardContext) => {
      res.card.shop && (res.card.shop.logo = MEDIA_URL + res.card.shop.logo);
      return res;
    });
  }

  deleteCard(id: number) {
    const url = `${this._url}/cards/${id}`;
    const options: IRequestOptions = {
      method: 'DELETE',
      headers: this._headers,
    };
    return this._requestApi(url, options);
  }
};
