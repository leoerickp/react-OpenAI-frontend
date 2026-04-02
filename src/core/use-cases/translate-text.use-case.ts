import { api } from "../../config";
import type { Translate, TranslateResponse } from "../../interfaces";

export const translateTextUseCase = async(prompt: string, lang: string): Promise<Translate> => {
  try {
      const data = await api.post('/gpt/translate', { prompt, lang }).json<TranslateResponse>();

      return {
        ok: true,
        message: data.message
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error unknown';
      return {
        ok: false,
        message: errorMessage,        
      }
      
    }
}
