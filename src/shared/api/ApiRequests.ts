import { IPostCard, ISignInRequest, ISignUpRequest } from '..';

interface IRequestOptions {
  headers: HeadersInit;
  method: string;
  body?: BodyInit;
  credentials?: RequestCredentials;
}

interface IApiRequests {
  _url: string;
  _headers: HeadersInit;
  _checkResponse: (res: Response) => void;
  _requestApi: (url: string, options: IRequestOptions) => void;
  signUp(data: ISignUpRequest): Promise<void>;
  signIn(data: ISignInRequest): Promise<void>;
  signOut(): Promise<void>;
  getUser(): Promise<void>;
  getShops(): Promise<void>;
  getCards(): Promise<void>;
  getCards(): Promise<void>;
  postCard(data: IPostCard): Promise<void>;
  editCard(data: IPostCard, id: number): Promise<void>;
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
    console.log('reqApi - url: ', url, 'reqApi - options: ', options);
    return fetch(`${url}`, options).then(this._checkResponse);
  }

  _checkResponse(res: Response) {
    res.ok ? res.json() : Promise.reject(`${res.status}`);
  }

  signUp(data: ISignUpRequest) {
    const url = `${this._url}/users/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options);
  }

  signIn(data: ISignInRequest) {
    const url = `${this._url}/auth/token/login/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options);
  }

  signOut() {
    const url = `${this._url}/auth/token/logout/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    };
    return this._requestApi(url, options);
  }

  getUser() {
    const url = `${this._url}/users/me/`;
    const options: IRequestOptions = {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    };
    console.log('getUser - url: ', url, 'getUser - options: ', options);
    return this._requestApi(url, options);
  }

  getShops() {
    const url = `${this._url}/shops/`;
    const options: IRequestOptions = {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    };
    return this._requestApi(url, options);
  }

  getCards() {
    const url = `${this._url}/cards/`;
    const options: IRequestOptions = {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    };
    return this._requestApi(url, options);
  }

  postCard(data: IPostCard) {
    const url = `${this._url}/cards/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options);
  }

  editCard(data: IPostCard, id: number) {
    const url = `${this._url}/cards/${id.toString()}`;
    const options: IRequestOptions = {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options);
  }

  deleteCard(id: number) {
    const url = `${this._url}/cards/${id.toString()}`;
    const options: IRequestOptions = {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    };
    return this._requestApi(url, options);
  }
};
