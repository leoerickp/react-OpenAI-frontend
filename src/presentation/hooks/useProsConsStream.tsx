import { useRef, useState } from 'react';
import { prosConsStreamGeneratorUseCase } from '../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

export const useProsConsStream = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }

    isRunning.current = true;
    setIsLoading(true);
    setMessages(prev => [...prev, { text, isGpt: false }]);

    const stream = prosConsStreamGeneratorUseCase(text, abortController.current.signal);
    setIsLoading(false);

    if (!stream) return;

    setMessages(prev => [...prev, { text: '', isGpt: true }]);

    for await (const text of stream) {
      setMessages(prev => {
        // to avoid mutation
        return prev.map((msg, index) => (index === prev.length - 1 ? { ...msg, text } : msg));
      });
    }
    isRunning.current = false;

    //!Old logic
    // const reader = await prosConsStreamUseCase(text);
    // setIsLoading(false);

    // if (!reader) return;

    // const decoder = new TextDecoder();
    // let accumulatedText = '';
    // let gptMessageIndex = -1;
    // setMessages(prev => {
    //   gptMessageIndex = prev.length;
    //   return [...prev, { text: '', isGpt: true }];
    // });
    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) break;
    //   accumulatedText += decoder.decode(value, { stream: true });
    //   setMessages(prev => {
    //     // to avoid mutation
    //     return prev.map((msg, index) => (index === gptMessageIndex ? { ...msg, text: accumulatedText } : msg));
    //   });
    // }
  };
  return { messages, isLoading, handlePost };
};
