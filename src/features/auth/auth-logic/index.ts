import {
  IRequestResetPassword,
  ISignInRequest,
  ISignUpRequest,
  IDeleteUserRequest,
  api,
} from '~/shared';

export function getUser() {
  return api.getUser();
}

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

export function deleteUser(data: IDeleteUserRequest, userId: number) {
  return api
    .deleteUser(data, userId)
    .then(() => localStorage.removeItem('token'));
}
