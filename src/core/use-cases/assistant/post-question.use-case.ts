import { api } from "../../../config";
import type { Assistant, AssistantMessageResponse } from "../../../interfaces";

export const postQuestionUseCase = async (threadId: string, question: string): Promise<Assistant> => {
  try {
    const resp = await api.post('/fa-assistant/user-question',{threadId, question}).json<AssistantMessageResponse[]>();

    return {
      ok: true,
      message: resp.map(msj => ({
        role: msj.role,
        content: msj.content,
      })),
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error unknown';
    return {
      ok: false,
      errorMessage: errorMessage,
    }
  }
}