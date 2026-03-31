import { useState } from 'react';
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../components';
import { useContentScroll } from '../hooks';

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useContentScroll(messages);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { text, isGpt: false }]);

    //Todo UseCase

    setIsLoading(false);

    //Todo: add Gpt true
  };
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GptMessage text="Hola, puedes escribir tu texto en español y te ayudo con las correcciones" />
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
