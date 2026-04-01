import { ChatFrameWithFileBox, GptMessage, MyMessage } from '../../components';
import { useAudioToText } from '../../hooks';

export const AudioToTextPage = () => {
  const { messages, isLoading, handlePost } = useAudioToText();
  return (
    <ChatFrameWithFileBox
      messages={messages}
      onSendMessage={handlePost}
      placeholder="Escribe aqui lo que deseas..."
      isLoading={isLoading}
      initialText="Hola ¿Qué audio quieres convertir a texto hoy?"
      accept="audio/*"
    >
      {messages.map((message, index) =>
        message.isGpt ? <GptMessage key={index} text={message.text} /> : <MyMessage key={index} text={message.text} />,
      )}
    </ChatFrameWithFileBox>
  );
};
