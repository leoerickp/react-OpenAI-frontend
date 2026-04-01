import { useState } from 'react';
import { prosConsUseCase } from '../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

export const useProsCons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { text, isGpt: false }]);

    const { ok, content } = await prosConsUseCase(text);
    setIsLoading(false);

    if (!ok) return;

    setMessages(prev => [...prev, { text: content, isGpt: true }]);
  };
  return { messages, isLoading, handlePost };
};
