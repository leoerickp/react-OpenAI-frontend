import { useState } from 'react';
import { orthographyUseCase } from '../../core/use-cases';
import type { OrthographyResponse } from '../../interfaces';
import { generateId } from '../../config';

interface Message {
  id: string;
  text: string;
  isGpt: boolean;
  info?: OrthographyResponse;
}
export const useOrthography = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: crypto.randomUUID(), text, isGpt: false }]);

    const data = await orthographyUseCase(text);
    const { is_correct } = data;
    if (!is_correct) {
      setMessages(prev => [...prev, { id: generateId(), text: data.errors.join(', '), isGpt: true, info: data }]);
    } else {
      setMessages(prev => [...prev, { id: generateId(), text: data.corrected_text, isGpt: true, info: data }]);
    }
    setIsLoading(false);
  };
  return { messages, isLoading, handlePost };
};
