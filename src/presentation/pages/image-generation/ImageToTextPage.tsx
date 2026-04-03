import { ChatFrameWithFileBox, GptMessage, GptMessageImage, MyMessage } from '../../components';
import { useImageToText } from '../../hooks';

export const ImageToTextPage = () => {
  const { messages, isLoading, handlePost, neverDisableSendButton } = useImageToText();
  return (
    <ChatFrameWithFileBox
      messages={messages}
      onSendMessage={handlePost}
      placeholder="Escribe aqui lo que deseas..."
      isLoading={isLoading}
      initialText="Hola ¿Qué imagen quieres convertir a texto hoy?"
      accept="image/*"
      neverDisableSendButton={neverDisableSendButton}
    >
      {messages.map(message =>
        message.isGpt ? (
          message.url ? (
            <GptMessageImage key={message.id} imageUrl={message.url ?? ''} alt={message.text} text={message.text} />
          ) : (
            <GptMessage key={message.id} text={message.text} />
          )
        ) : (
          <MyMessage key={message.id} text={message.text} />
        ),
      )}
    </ChatFrameWithFileBox>
  );
};
