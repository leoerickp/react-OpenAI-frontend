import { useRef, useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from '../../components';
import { prosConsStreamGeneratorUseCase, prosConsStreamUseCase } from '../../../core/use-cases';
import { useContentScroll } from '../../hooks';

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useContentScroll(messages);

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
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GptMessage text="Hola, ¿Qué deseas comparar hoy?" />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            ),
          )}

          {isLoading && <TypingLoader className="col-start-1 col-end-12 fade-in" />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <TextMessageBox onSendMessage={handlePost} placeholder="Escribe aqui lo que deseas..." disableCorrections />
    </div>
  );
};
