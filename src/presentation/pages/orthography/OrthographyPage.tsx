import { useState } from 'react';
import { GptMessage, MyMessage, TextMessageBox, TypingLoader, GptOrthographyMessage } from '../../components';
import { orthographyUseCase } from '../../../core/use-cases';
import type { OrthographyResponse } from '../../../interfaces/orthography.response';
import { useContentScroll } from '../../hooks';

interface Message {
  id: string;
  text: string;
  isGpt: boolean;
  info?: OrthographyResponse;
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useContentScroll(messages);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: crypto.randomUUID(), text, isGpt: false }]);

    const data = await orthographyUseCase(text);
    const { is_correct } = data;
    if (!is_correct) {
      setMessages(prev => [
        ...prev,
        { id: crypto.randomUUID(), text: data.errors.join(', '), isGpt: true, info: data },
      ]);
    } else {
      setMessages(prev => [...prev, { id: crypto.randomUUID(), text: data.corrected_text, isGpt: true, info: data }]);
    }
    setIsLoading(false);
  };
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GptMessage text="Hola, puedes escribir tu texto en español y te ayudo con las correcciones" />
          {messages.map(message =>
            message.isGpt && message.info ? (
              <GptOrthographyMessage key={message.id} {...message.info} />
            ) : (
              <MyMessage key={message.id} text={message.text} />
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
