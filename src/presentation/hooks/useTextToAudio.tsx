import { useState } from 'react';
import { textToAudioUseCase } from '../../core/use-cases';

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: 'text';
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audioUrl?: string;
  type: 'audio';
}

type Message = TextMessage | AudioMessage;

export const useTextToAudio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { text, isGpt: false, type: 'text' }]);

    const { ok, audioUrl, errorMessage } = await textToAudioUseCase(text, selectedVoice);

    setIsLoading(false);

    if (ok) {
      setMessages(prev => [...prev, { text: `${selectedVoice} - ${text}`, isGpt: true, audioUrl, type: 'audio' }]);
    } else {
      setMessages(prev => [...prev, { text: errorMessage!, isGpt: true, type: 'text' }]);
    }
  };
  return { messages, isLoading, handlePost };
};
