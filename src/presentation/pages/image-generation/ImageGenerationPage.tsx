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
      {messages.map((message, index) =>
        message.isGpt ? (
          <GptMessageImage key={index} imageUrl={message.info?.imageUrl ?? ''} alt={message.info?.alt ?? ''} />
        ) : (
          <MyMessage key={index} text={message.text} />
        ),
      )}
    </ChatFrameWithTextBox>
  );
};
