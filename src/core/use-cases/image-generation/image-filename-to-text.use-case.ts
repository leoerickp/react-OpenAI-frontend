import { api } from "../../../config";
import type { ImageFilenameToText, ImageFilenameToTextResponse } from "../../../interfaces";

export const imageFilenameToTextUseCase = async(fileName: string, prompt?: string): Promise<ImageFilenameToText> => {
  try {
    const data = await api.post(`/gpt/extract-text-from-url/${fileName}`, { prompt }).json<ImageFilenameToTextResponse>();
        
    return {
      ok: true,
      ...data
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error unknown';
    return {
      ok: false,
      message: errorMessage,
    }
  }
}