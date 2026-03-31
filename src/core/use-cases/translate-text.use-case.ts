import { apiGpt } from "../../config";
import type { Translate, TranslateResponse } from "../../interfaces";

export const translateTextUseCase = async(prompt: string, lang: string): Promise<Translate> => {
  try {
      const data = await apiGpt.post('/translate', { prompt, lang }).json<TranslateResponse>();

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
