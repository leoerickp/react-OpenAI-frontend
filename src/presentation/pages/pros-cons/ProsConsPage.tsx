import { GptMessage, MyMessage, ChatFrameWithTextBox } from '../../components';
import { useProsCons } from '../../hooks';

export const ProsConsPage = () => {
  const { messages, isLoading, handlePost } = useProsCons();
  return (
    <ChatFrameWithTextBox
      messages={messages}
      onSendMessage={handlePost}
      placeholder="Escribe aqui lo que deseas..."
      isLoading={isLoading}
      initialText="Hola, puedes escribir lo que quieras que compare y te de mi punto de vista."
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
