import { apiGpt } from "../../config";

export const prosConsStreamUseCase = async (prompt: string): Promise<ReadableStreamDefaultReader<Uint8Array<ArrayBuffer>> | undefined> => {
  try {
    const reader = await apiGpt.post('/pros-cons-discusser-stream', { prompt }).stream();

    if(!reader) return;

    return reader;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error unknown';
    console.error(errorMessage);
  }
}