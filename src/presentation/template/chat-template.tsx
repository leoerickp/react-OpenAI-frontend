import { useState } from 'react';
import { ChatFrameWithTextBox, GptMessage, MyMessage } from '../components';

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { text, isGpt: false }]);

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
      {messages.map((message, index) =>
        message.isGpt ? <GptMessage key={index} text={message.text} /> : <MyMessage key={index} text={message.text} />,
      )}
    </ChatFrameWithTextBox>
  );
};
