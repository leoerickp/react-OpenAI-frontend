import { useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBox, GptMessageImage } from '../../components';
import { useContentScroll } from '../../hooks';
import { imageGenerationUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useContentScroll(messages);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { text, isGpt: false }]);

    const { ok, errorMessage, url, alt } = await imageGenerationUseCase(text);
    setIsLoading(false);

    if (!ok) {
      setMessages(prev => [...prev, { text: errorMessage ?? 'Unknown error', isGpt: true }]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          text: alt ?? 'Generated image',
          isGpt: true,
          info: { imageUrl: url ?? '', alt: alt ?? '' },
        },
      ]);
    }
  };
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GptMessage text="¿Qué imagen deseas generar hoy?" />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessageImage key={index} imageUrl={message.info?.imageUrl ?? ''} alt={message.info?.alt ?? ''} />
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
