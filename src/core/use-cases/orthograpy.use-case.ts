import { api } from "../../config";
import type { Orthography, OrthographyResponse } from "../../interfaces";

export const orthographyUseCase = async (prompt: string): Promise<Orthography> => {
  try {
    const data = await api.post('/gpt/orthography-check', { prompt }).json<OrthographyResponse>();
    
    return {
      ok: true,
      ...data
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error unknown';
    return {
      ok: false,
      is_correct: false,
      corrected_text: 'Correction could not be made',
      errors: [errorMessage],
      suggestions: [],
      correct_label: 'Corrected text',
      uncorrect_label: 'Uncorrected text',
      suggestions_label: 'Suggestions',
      mistakes_label: 'Mistakes',
    }
    
  }
}