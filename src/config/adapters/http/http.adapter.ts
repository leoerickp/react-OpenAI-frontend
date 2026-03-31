import { HttpResponseBuilder } from './http-response-builder';

export abstract class HttpAdapter {
  abstract post(url: string, body: Record<string, unknown>, init?: RequestInit): HttpResponseBuilder;
}
