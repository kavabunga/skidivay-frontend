import {
  ICardContext,
  ICardsContext,
  INewCardResponse,
  IPostCard,
  IShopListContext,
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
  IUserContext,
  IUserResponse,
} from '..';

interface IRequestOptions {
  headers: HeadersInit;
  method: string;
  body?: BodyInit;
  credentials?: RequestCredentials;
}

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
  editCard(data: IPostCard, id: number): Promise<void>;
  changeCardLikeStatus(id: number, hasLike: boolean): Promise<ICardContext>;
  deleteCard(id: number): Promise<void>;
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
    return fetch(`${url}`, options).then((res) =>
      res.ok
        ? res.json()
        : res.json().then((res) => Promise.reject(new Error(res.message)))
    );
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
    if (localStorage.getItem('token')) {
      options.headers = {
        ...options.headers,
        authorization: `Token ${localStorage.getItem('token') || ''}`,
      };
    }
    return fetch(`${url}`, options).then((res) =>
      res.ok
        ? res
        : res.json().then((res) => Promise.reject(new Error(res.message)))
    );
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
    return this._requestApi(url, options);
  }

  getCards() {
    const url = `${this._url}/cards/`;
    const options: IRequestOptions = {
      method: 'GET',
      headers: this._headers,
    };
    return this._requestApi(url, options);
  }

  postCard(data: IPostCard) {
    const url = `${this._url}/cards/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options);
  }

  editCard(data: IPostCard, id: number) {
    const url = `${this._url}/cards/${id.toString()}`;
    const options: IRequestOptions = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options);
  }

  changeCardLikeStatus(id: number, hasLike: boolean) {
    const url = `${this._url}/cards/${id.toString()}/favorite/`;
    const method = hasLike ? 'POST' : 'DELETE';
    const options: IRequestOptions = {
      method: method,
      headers: this._headers,
    };
    return this._requestApi(url, options);
  }

  deleteCard(id: number) {
    const url = `${this._url}/cards/${id.toString()}`;
    const options: IRequestOptions = {
      method: 'DELETE',
      headers: this._headers,
    };
    return this._requestApi(url, options);
  }
};
