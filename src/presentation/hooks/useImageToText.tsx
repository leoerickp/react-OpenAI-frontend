import { useState } from 'react';
import { generateId } from '../../config';
import { imageToTextUseCase } from '../../core/use-cases';

interface Message {
  id: string;
  text: string;
  url?: string;
  isGpt: boolean;
}

export const useImageToText = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, imageFile: File) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: generateId(), text, isGpt: false }]);

    const data = await imageToTextUseCase(imageFile, text);
    setIsLoading(false);
    if (!data.ok) return;

    setMessages(prev => [...prev, { id: generateId(), text: data.message, url: data.url, isGpt: true }]);
  };
  return { messages, isLoading, handlePost };
};
