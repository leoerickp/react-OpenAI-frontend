export interface AssistantMessageResponse {
    role: string;
    content: string[];
}

export interface AssistantMessage {
    role: string;
    content: string[];
}
export interface Assistant {
    ok: boolean;
    message?: AssistantMessage[];
    errorMessage?: string;
}

export interface AssistantThreadResponse {
    id: string;
}

export interface AssistantThread {
    ok: boolean;
    threadId?: string;
    errorMessage?: string;
}
