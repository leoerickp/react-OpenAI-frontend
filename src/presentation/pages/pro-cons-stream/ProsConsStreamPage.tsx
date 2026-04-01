import { GptMessage, MyMessage, ChatFrameWithTextBox } from '../../components';
import { useProsConsStream } from '../../hooks';

export const ProsConsStreamPage = () => {
  const { messages, isLoading, handlePost } = useProsConsStream();
  return (
    <ChatFrameWithTextBox
      messages={messages}
      onSendMessage={handlePost}
      placeholder="Escribe aqui lo que deseas..."
      isLoading={isLoading}
      initialText="Hola, ¿Qué deseas comparar hoy?"
    >
      {messages.map((message, index) =>
        message.isGpt ? <GptMessage key={index} text={message.text} /> : <MyMessage key={index} text={message.text} />,
      )}
    </ChatFrameWithTextBox>
  );
};
