import { api } from "../../../config";
import { type ImageToText, type ImageToTextResponse } from "../../../interfaces";

export const imageToTextUseCase = async(imageFile: File, prompt?: string): Promise<ImageToText> => {
  try {
      const formData = new FormData();
      formData.append('file', imageFile);
      if(prompt){
        formData.append('prompt', prompt);
      }

      const data = await api.post('/gpt/extract-text-from-image', formData).json<ImageToTextResponse>();

      
      return {
        ok: true,
        ...data,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error unknown';
      return {
        ok: false,
        message: errorMessage,
        url: '',
        fileName: '',
      }
    }
}
