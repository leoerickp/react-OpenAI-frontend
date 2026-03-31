import { FetchAdapter } from './http/fetch.adapter';

export const apiGpt = new FetchAdapter({
  baseUrl: import.meta.env.VITE_GPT_API,
});
