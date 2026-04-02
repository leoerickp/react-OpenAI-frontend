import { useState } from 'react';
import { prosConsUseCase } from '../../core/use-cases';
import { generateId } from '../../config';

interface Message {
  id: string;
  text: string;
  isGpt: boolean;
}

export const useProsCons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: generateId(), text, isGpt: false }]);

    const { ok, content } = await prosConsUseCase(text);
    setIsLoading(false);

    if (!ok) return;

    setMessages(prev => [...prev, { id: generateId(), text: content, isGpt: true }]);
  };
  return { messages, isLoading, handlePost };
};
