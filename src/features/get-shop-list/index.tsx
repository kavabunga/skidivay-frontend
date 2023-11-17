export function checkResponse(res: Response) {
  res.ok ? res.json() : Promise.reject(`${res.status}`);
}

export function requestApi(url: string, method?: string, body?: BodyInit) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const config: RequestInit = {
    method,
    headers,
    body,
  };
  return fetch(`${url}`, config).then(checkResponse);
}

export const getShopList = () => {
  return requestApi(
    'http://skidivay.acceleratorpracticum.ru/api/v1/shops/',
    'GET'
  );
};
