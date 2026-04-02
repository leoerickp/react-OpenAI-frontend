import { api } from "../../../config";
import type { ProsCons, ProsConsResponse } from "../../../interfaces";

export const prosConsUseCase = async (prompt: string): Promise<ProsCons> => {
  try {
    const data = await api.post('/gpt/pros-cons-discusser', { prompt }).json<ProsConsResponse>();

    return {
      ok: true,
      content: data.content
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error unknown';
    return {
      ok: false,
      content: errorMessage
    }
  }
}