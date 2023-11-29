export interface IApiError {
  message: string;
  status: number;
  detail?: object;
}

export class ApiError extends Error implements IApiError {
  status: number;
  detail?: object;

  constructor(message: string, status: number, detail?: object) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}
