import { api } from "../../config";
import { type Transcription, type TranscriptionResponse } from "../../interfaces";

export const audioToTextUseCase = async(audioFile: File, prompt?: string): Promise<Transcription> => {
  console.log({prompt, audioFile});
  try {
      const formData = new FormData();
      formData.append('file', audioFile);
      if(prompt){
        formData.append('prompt', prompt);
      }

      const data = await api.post('/gpt/audio-to-text', formData).json<TranscriptionResponse>();

      
      return {
        ok: true,
        ...data,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error unknown';
      return {
        ok: false,
        text: errorMessage,
        task: '',
        language: '',
        duration: 0,
        segments: [],
        usage: {
          type: '',
          seconds: 0,
        },
      }
      
    }
}
