import {
  IRequestResetPassword,
  ISignInRequest,
  ISignUpRequest,
  api,
} from '~/shared';

export function signUp(data: ISignUpRequest) {
  return api.signUp(data);
}

export function signIn(data: ISignInRequest) {
  return api.signIn(data).then((res) => {
    localStorage.setItem('token', res.auth_token);
    return res;
  });
}

export function signOut() {
  return api.signOut().then(() => localStorage.removeItem('token'));
}

export function requestResetPassword(data: IRequestResetPassword) {
  return api.requestResetPassword(data);
}
