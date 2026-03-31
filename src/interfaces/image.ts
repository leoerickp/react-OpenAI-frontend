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