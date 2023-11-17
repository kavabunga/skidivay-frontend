import { BACKEND_URL as baseUrl } from '..';
import { ApiRequests } from '.';

export const api = new ApiRequests(baseUrl);
