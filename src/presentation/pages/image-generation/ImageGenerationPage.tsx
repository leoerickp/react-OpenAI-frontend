import { MyMessage, GptMessageImage, ChatFrameWithTextBox } from '../../components';
import { useImageGeneration } from '../../hooks';

export const ImageGenerationPage = () => {
  const { messages, isLoading, handlePost } = useImageGeneration();
  return (
    <ChatFrameWithTextBox
      messages={messages}
      onSendMessage={handlePost}
      placeholder="Escribe aqui lo que deseas..."
      isLoading={isLoading}
      initialText="¿Qué imagen deseas generar hoy?"
    >
      {messages.map(message =>
        message.isGpt ? (
          <GptMessageImage key={message.id} imageUrl={message.info?.imageUrl ?? ''} alt={message.info?.alt ?? ''} />
        ) : (
          <MyMessage key={message.id} text={message.text} />
        ),
      )}
    </ChatFrameWithTextBox>
  );
};
