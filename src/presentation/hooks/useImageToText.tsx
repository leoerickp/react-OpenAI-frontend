import { useState } from 'react';
import { generateId } from '../../config';
import { imageFilenameToTextUseCase, imageToTextUseCase } from '../../core/use-cases';

interface Message {
  id: string;
  text: string;
  url?: string;
  isGpt: boolean;
}

export const useImageToText = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  const handlePost = async (text: string, imageFile: File) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: generateId(), text, isGpt: false }]);

    if (imageFile) {
      const data = await imageToTextUseCase(imageFile, text);
      setIsLoading(false);
      if (!data.ok) return;

      setMessages(prev => [...prev, { id: generateId(), text: data.message, url: data.url, isGpt: true }]);
      setFileName(data.fileName);
    } else {
      const data = await imageFilenameToTextUseCase(fileName!, text);
      setIsLoading(false);
      if (!data.ok) return;

      setMessages(prev => [...prev, { id: generateId(), text: data.message, isGpt: true }]);
    }
  };
  return { messages, isLoading, handlePost, neverDisableSendButton: fileName !== null };
};
