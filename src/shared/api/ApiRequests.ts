import { ISignUpRequest } from '..';
// import { IUserContext, ICardsContext, IShopListContext } from '..';

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
    return fetch(`${url}`, options).then(this._checkResponse);
  }

  _checkResponse(res: Response) {
    res.ok ? res.json() : Promise.reject(`${res.status}`);
  }

  signUp(data: ISignUpRequest) {
    const url: string = `${this._url}/users/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options);
  }
};
