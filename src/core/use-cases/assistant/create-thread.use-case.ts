import { api } from "../../../config";
import type { AssistantThread, AssistantThreadResponse } from "../../../interfaces";

export const createThreadUseCase = async(): Promise<AssistantThread> => {
  try {
    const response = await api.post('/fa-assistant/create-thread',{}).json<AssistantThreadResponse>();

    return {
      ok: true,
      threadId: response.id,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error unknown';
    return {
      ok: false,
      errorMessage: errorMessage,
    }
  }
}