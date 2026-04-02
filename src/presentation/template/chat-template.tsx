import { useState } from 'react';
import { ChatFrameWithTextBox, GptMessage, MyMessage } from '../components';
import { generateId } from '../../config';

interface Message {
  id: string;
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: generateId(), text, isGpt: false }]);

    //Todo UseCase

    setIsLoading(false);

    //Todo: add Gpt true
  };
  return (
    <ChatFrameWithTextBox
      messages={messages}
      onSendMessage={handlePost}
      placeholder="Escribe aqui lo que deseas..."
      isLoading={isLoading}
      initialText="Hola, puedes escribir tu texto en español y te ayudo con las correcciones"
    >
      {messages.map(message =>
        message.isGpt ? (
          <GptMessage key={message.id} text={message.text} />
        ) : (
          <MyMessage key={message.id} text={message.text} />
        ),
      )}
    </ChatFrameWithTextBox>
  );
};
