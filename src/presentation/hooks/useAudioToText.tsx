import { useState } from 'react';
import { audioToTextUseCase } from '../../core/use-cases/audio-to-text.use-case';
import { generateId } from '../../config';

interface Message {
  id: string;
  text: string;
  isGpt: boolean;
}

export const useAudioToText = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, audioFile: File) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: generateId(), text, isGpt: false }]);

    const data = await audioToTextUseCase(audioFile, text);
    setIsLoading(false);
    if (!data.ok) return;
    const gptMarkdownMessage = `
## Transcripción:
__Duración:__ ${Math.round(data.duration * 100) / 100} segundos
### El texto es:
${data.text}
`;

    setMessages(prev => [...prev, { id: generateId(), text: gptMarkdownMessage, isGpt: true }]);

    for (const segment of data.segments) {
      const segmentMessage = `
__De ${Math.round(segment.start * 100) / 100} a ${Math.round(segment.end * 100) / 100} segundos:__
${segment.text}
      `;
      setMessages(prev => [...prev, { id: generateId(), text: segmentMessage, isGpt: true }]);
    }
  };
  return { messages, isLoading, handlePost };
};
