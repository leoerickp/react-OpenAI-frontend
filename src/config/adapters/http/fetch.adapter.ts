import { HttpResponseBuilder } from './http-response-builder';
import { HttpAdapter } from './http.adapter';

export class FetchAdapter implements HttpAdapter {
  private readonly options: { baseUrl: string };

  constructor(options: { baseUrl: string }) {
    this.options = options;
  }

  post(url: string, body: Record<string, unknown> | FormData, init?: RequestInit) {
    const responsePromise = fetch(`${this.options.baseUrl}${url}`, {
      method: 'POST',
      headers: !(body instanceof FormData) ? {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      } : undefined,
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...init,
    });

    return new HttpResponseBuilder(responsePromise);
  }
  
}