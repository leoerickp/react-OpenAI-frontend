import { useState } from 'react';
import { imageVariationUseCase, imageGenerationUseCase } from '../../core/use-cases';
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

export const useImageTunning = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    original: undefined as string | undefined,
    originalAlt: undefined as string | undefined,
    mask: undefined as string | undefined,
  });

  const handleVariation = async () => {
    setIsLoading(true);
    const resp = await imageVariationUseCase(originalImageAndMask.originalAlt!);
    setIsLoading(false);

    if (resp && !resp.ok) {
      return;
    }

    setMessages(prev => [
      ...prev,
      {
        text: 'Variation',
        isGpt: true,
        info: {
          imageUrl: resp.url,
          alt: resp.alt,
        },
      } as Message,
    ]);
  };

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: generateId(), text, isGpt: false }]);

    const { mask, original } = originalImageAndMask;

    const { ok, errorMessage, url, alt } = await imageGenerationUseCase(text, original, mask);
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
  return { messages, isLoading, handlePost, handleVariation, originalImageAndMask, setOriginalImageAndMask };
};
