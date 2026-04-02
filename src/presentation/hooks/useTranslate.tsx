import { useState } from 'react';
import { translateTextUseCase } from '../../core/use-cases';
import { generateId } from '../../config';

interface Message {
  id: string;
  text: string;
  isGpt: boolean;
}

export const useTranslate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedOption: string) => {
    setIsLoading(true);
    const newMessage = `Traduce: ${text} al idioma ${selectedOption}`;
    setMessages(prev => [...prev, { id: generateId(), text: newMessage, isGpt: false }]);

    const resp = await translateTextUseCase(text, selectedOption);

    setIsLoading(false);

    if (resp.ok) {
      setMessages(prev => [...prev, { id: generateId(), text: resp.message, isGpt: true }]);
    } else {
      setMessages(prev => [...prev, { id: generateId(), text: resp.message, isGpt: true }]);
    }
  };
  return { messages, isLoading, handlePost };
};
