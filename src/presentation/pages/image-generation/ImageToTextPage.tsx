import { ChatFrameWithFileBox, GptMessageImage, MyMessage } from '../../components';
import { useImageToText } from '../../hooks';

export const ImageToTextPage = () => {
  const { messages, isLoading, handlePost } = useImageToText();
  return (
    <ChatFrameWithFileBox
      messages={messages}
      onSendMessage={handlePost}
      placeholder="Escribe aqui lo que deseas..."
      isLoading={isLoading}
      initialText="Hola ¿Qué imagen quieres convertir a texto hoy?"
      accept="image/*"
    >
      {messages.map(message =>
        message.isGpt ? (
          <GptMessageImage key={message.id} imageUrl={message.url ?? ''} alt={message.text} />
        ) : (
          <MyMessage key={message.id} text={message.text} />
        ),
      )}
    </ChatFrameWithFileBox>
  );
};
