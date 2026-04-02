import { ChatFrameWithTextBox, GptMessage, MyMessage } from '../../components';
import { useAssistant } from '../../hooks';

export const AssistantPage = () => {
  const { messages, isLoading, handlePost } = useAssistant();
  return (
    <ChatFrameWithTextBox
      messages={messages}
      onSendMessage={handlePost}
      placeholder="Escribe aqui lo que deseas..."
      isLoading={isLoading}
      initialText="Hola, soy Fa ¿Cómo puedo ayudarte hoy?"
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
