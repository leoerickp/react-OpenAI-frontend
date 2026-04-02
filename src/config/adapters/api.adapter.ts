import { FetchAdapter } from './http/fetch.adapter';

export const api = new FetchAdapter({
  baseUrl: import.meta.env.VITE_API,
});
