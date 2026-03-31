import { apiGpt } from "../../config";

export async function* prosConsStreamGeneratorUseCase(prompt: string, signal: AbortSignal) {
  try {
    const reader = await apiGpt.post('/pros-cons-discusser-stream', { prompt }, { signal }).stream();

    if(!reader) return;

    const decoder = new TextDecoder();
    let text = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
      yield text;
    }

    return reader;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error unknown';
    console.error(errorMessage);
  }
}