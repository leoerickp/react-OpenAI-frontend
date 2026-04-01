import { apiGpt } from "../../config";
import type { ImageGeneration, ImageGenerationResponse } from "../../interfaces";

export const imageVariationUseCase = async(prompt: string): Promise<ImageGeneration> => {
  try {
    const data = await apiGpt.post('/image-variation', { prompt }).json<ImageGenerationResponse>();

    return {
      ok: true,
      url: data.url,
      alt: data.revisedPrompt,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error unknown';
    return {
      ok: false,
      errorMessage: errorMessage,
    }
    
  }
}