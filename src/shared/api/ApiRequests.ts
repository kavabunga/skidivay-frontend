import {
  ICard,
  ICardContext,
  IPatchCard,
  IPostCard,
  IShop,
  ISignInRequest,
  ISignUpRequest,
  IRequestResetPassword,
  IRequestSetNewPassword,
  IChangePasswordRequest,
  IChangeEmailRequest,
  IDeleteUserRequest,
  IPatchUser,
  MEDIA_URL,
} from '..';
import { ApiError } from '../errors';

//NOTE: Function to add full url to images. MEDIA_URL value depends on .env variables and differs on build modes
const addBaseMediaUrl = (url: string | null | undefined): string => {
  return url ? MEDIA_URL + url : '';
};

interface IRequestOptions {
  headers: HeadersInit;
  method: string;
  body?: BodyInit;
  credentials?: RequestCredentials;
}

export const ApiRequests = class ApiRequests {
  _url: string;
  _headers: HeadersInit;
  constructor(url: string) {
    this._url = url;
    this._headers = {
      'Content-Type': 'application/json',
    };
  }

  _requestApi(url: string, options: IRequestOptions) {
    return fetch(`${url}`, options)
      .then((res) => (res.ok ? res : this._handleError(res)))
      .then((res) => {
        if (res.status === 204) {
          return res;
        } else {
          try {
            return res.json();
          } catch (err) {
            return res;
          }
        }
      });
  }

  _requestAuthorizedApi(url: string, options: IRequestOptions) {
    if (localStorage.getItem('token')) {
      options.headers = {
        ...options.headers,
        authorization: `Token ${localStorage.getItem('token') || ''}`,
      };
    }
    return this._requestApi(url, options);
  }

  _handleError(res: Response) {
    switch (res.status) {
      case 401:
        {
          localStorage.removeItem('token');
        }
        break;
    }
    return res.json().then((err) => {
      return Promise.reject(new ApiError(err.message, res.status, err.detail));
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
    return this._requestAuthorizedApi(url, options);
  }

  getUser() {
    const url = `${this._url}/users/me/`;
    const options: IRequestOptions = {
      method: 'GET',
      headers: this._headers,
    };
    return this._requestAuthorizedApi(url, options);
  }

  getShops() {
    const url = `${this._url}/shops/`;
    const options: IRequestOptions = {
      method: 'GET',
      headers: this._headers,
    };
    return this._requestApi(url, options).then((res) =>
      res.map((item: IShop) => {
        item.logo && (item.logo = addBaseMediaUrl(item.logo));
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
    return this._requestAuthorizedApi(url, options).then((res) =>
      res.map((item: ICardContext) => {
        item.card?.shop?.logo &&
          (item.card.shop.logo = addBaseMediaUrl(item.card.shop.logo));
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
    return this._requestAuthorizedApi(url, options).then((res: ICard) => {
      res.shop?.logo && (res.shop.logo = addBaseMediaUrl(res.shop.logo));
      return res;
    });
  }

  postCardWithShop(data: IPostCard) {
    const url = `${this._url}/cards/new-shop/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestAuthorizedApi(url, options).then((res: ICard) => {
      res.shop?.logo && (res.shop.logo = addBaseMediaUrl(res.shop.logo));
      return res;
    });
  }

  editCard(data: IPatchCard, id: number) {
    const url = `${this._url}/cards/${id.toString()}/`;
    const options: IRequestOptions = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestAuthorizedApi(url, options).then((res: ICard) => {
      res.shop?.logo && (res.shop.logo = addBaseMediaUrl(res.shop.logo));

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
    return this._requestAuthorizedApi(url, options).then(
      (res: ICardContext) => {
        res.card?.shop?.logo &&
          (res.card.shop.logo = addBaseMediaUrl(res.card.shop.logo));
        return res;
      }
    );
  }

  deleteCard(id: number) {
    const url = `${this._url}/cards/${id}/`;
    const options: IRequestOptions = {
      method: 'DELETE',
      headers: this._headers,
    };
    return this._requestAuthorizedApi(url, options);
  }

  activateEmail(uid: string, token: string) {
    const url = `${this._url}/users/activation/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ uid, token }),
    };
    return this._requestAuthorizedApi(url, options);
  }

  requestResetPassword(data: IRequestResetPassword) {
    const url = `${this._url}/users/reset_password/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options);
  }

  setNewPassword(data: IRequestSetNewPassword) {
    const url = `${this._url}/users/reset_password_confirm/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestApi(url, options);
  }

  changeEmail(data: IChangeEmailRequest) {
    const url = `${this._url}/users/me/`;
    const options: IRequestOptions = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestAuthorizedApi(url, options);
  }

  editUser(data: IPatchUser) {
    const url = `${this._url}/users/me/`;
    const options: IRequestOptions = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestAuthorizedApi(url, options);
  }

  changePassword(data: IChangePasswordRequest) {
    const url = `${this._url}/users/set_password/`;
    const options: IRequestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestAuthorizedApi(url, options);
  }

  deleteUser(data: IDeleteUserRequest, id: number) {
    const url = `${this._url}/users/${id}/`;
    const options: IRequestOptions = {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify(data),
    };
    return this._requestAuthorizedApi(url, options);
  }
};
