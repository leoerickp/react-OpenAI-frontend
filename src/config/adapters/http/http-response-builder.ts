export class HttpResponseBuilder {
  private readonly responsePromise: Promise<Response>;
  constructor(responsePromise: Promise<Response>) {
    this.responsePromise = responsePromise;
  }

  async json<T = unknown>(): Promise<T> {
    const response = await this.responsePromise;

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  }

  async stream(): Promise<ReadableStreamDefaultReader<Uint8Array<ArrayBuffer>>> {
    const response = await this.responsePromise;

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No se pudo obtener el reader');
    }

    return reader;
  }

  async response(): Promise<Response> {
    const response = await this.responsePromise;

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  }
}