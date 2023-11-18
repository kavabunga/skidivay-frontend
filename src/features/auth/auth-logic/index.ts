import { ISignInRequest, ISignUpRequest, api } from '~/shared';

export function onSignUp(data: ISignUpRequest) {
  return api.signUp(data);
}

export function onSignIn(data: ISignInRequest) {
  return api
    .signIn(data)
    .then((res) => localStorage.setItem('token', res.auth_token));
}
