interface IDetail {
  [key: string]: [string];
}
export interface IApiError {
  message: string;
  status: number;
  detail?: IDetail;
}

export class ApiError extends Error implements IApiError {
  status: number;
  detail?: IDetail;

  constructor(message: string, status: number, detail?: IDetail) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}
