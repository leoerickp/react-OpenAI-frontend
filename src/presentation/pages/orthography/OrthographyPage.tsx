import { MyMessage, GptOrthographyMessage, ChatFrameWithTextBox } from '../../components';
import { useOrthography } from '../../hooks';

export const OrthographyPage = () => {
  const { messages, isLoading, handlePost } = useOrthography();
  return (
    <ChatFrameWithTextBox
      messages={messages}
      onSendMessage={handlePost}
      placeholder="Escribe aqui lo que deseas..."
      isLoading={isLoading}
      initialText="Hola, puedes escribir tu texto en español y te ayudo con las correcciones"
    >
      {messages.map(message =>
        message.isGpt && message.info ? (
          <GptOrthographyMessage key={message.id} {...message.info} />
        ) : (
          <MyMessage key={message.id} text={message.text} />
        ),
      )}
    </ChatFrameWithTextBox>
  );
};
