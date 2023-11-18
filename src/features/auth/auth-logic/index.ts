import { ISignInRequest, ISignUpRequest, api } from '~/shared';

export function onSignUp(data: ISignUpRequest) {
  return api.signUp(data);
}

export function onSignIn(data: ISignInRequest) {
  return api.signIn(data).then((res) => {
    localStorage.setItem('token', res.auth_token);
    return res;
  });
}

export function onSignOut() {
  console.log('token removing');
  return api.signOut().then(() => localStorage.removeItem('token'));
}
