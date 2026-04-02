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
