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
      {messages.map((message, index) =>
        message.isGpt ? <GptMessage key={index} text={message.text} /> : <MyMessage key={index} text={message.text} />,
      )}
    </ChatFrameWithTextBox>
  );
};
