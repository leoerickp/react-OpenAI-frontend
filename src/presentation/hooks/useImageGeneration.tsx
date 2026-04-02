import { useState } from 'react';
import { imageGenerationUseCase } from '../../core/use-cases';
import { generateId } from '../../config';

interface Message {
  id: string;
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export const useImageGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: generateId(), text, isGpt: false }]);

    const { ok, errorMessage, url, alt } = await imageGenerationUseCase(text);
    setIsLoading(false);

    if (!ok) {
      setMessages(prev => [...prev, { id: generateId(), text: errorMessage ?? 'Unknown error', isGpt: true }]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          id: generateId(),
          text: alt ?? 'Generated image',
          isGpt: true,
          info: { imageUrl: url ?? '', alt: alt ?? '' },
        },
      ]);
    }
  };
  return { messages, isLoading, handlePost };
};
