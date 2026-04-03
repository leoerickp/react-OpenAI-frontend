export interface ImageGeneration {
  ok: boolean;
  url?: string;
  alt?: string;
  errorMessage?: string;
}

export interface ImageGenerationResponse {
  url: string;
  openAIUrl: string;
  revisedPrompt: string;
}

export interface ImageToText {
  ok: boolean;
  url: string;
  message: string;
  fileName: string;
}
export interface ImageToTextResponse {
  url: string;
  message: string;
  fileName: string;
}

export interface ImageFilenameToText {
  ok: boolean;
  message: string;
}

export interface ImageFilenameToTextResponse {
  message: string;
}