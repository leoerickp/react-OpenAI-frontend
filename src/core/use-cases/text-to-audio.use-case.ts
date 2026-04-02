import { api } from "../../config";
import type { Audio } from "../../interfaces";

export const textToAudioUseCase = async(prompt: string, voice: string): Promise<Audio> => {
  try {
      const res = await api.post('/gpt/text-to-audio', { prompt, voice }).response();

      const audioFile = await res.blob();
      const audioUrl = URL.createObjectURL(audioFile);
      return {
        ok: true,
        audioUrl
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error unknown';
      return {
        ok: false,
        errorMessage,
      }
      
    }
}
