import { GptMessage, MyMessage, GptMessageAudio, ChatFrameWithSelectBox } from '../../components';
import { useTextToAudio } from '../../hooks';

const disclaimer = `## ¿Qué audio quieres generar hoy?
* Todo el audio generado es por AI`;

const voices = [
  { id: 'nova', text: 'Nova' },
  { id: 'alloy', text: 'Alloy' },
  { id: 'echo', text: 'Echo' },
  { id: 'fable', text: 'Fable' },
  { id: 'onyx', text: 'Onyx' },
  { id: 'shimmer', text: 'Shimmer' },
  { id: 'ash', text: 'Ash' },
  { id: 'coral', text: 'Coral' },
  { id: 'sage', text: 'Sage' },
];

export const TextToAudioPage = () => {
  const { messages, isLoading, handlePost } = useTextToAudio();
  return (
    <ChatFrameWithSelectBox
      messages={messages}
      onSendMessage={handlePost}
      placeholder="Escribe aqui lo que deseas..."
      options={voices}
      isLoading={isLoading}
      initialText={disclaimer}
    >
      {messages.map(message =>
        message.isGpt ? (
          message.type === 'audio' ? (
            <GptMessageAudio key={message.id} text={message.text} audioUrl={message.audioUrl} />
          ) : (
            <GptMessage key={message.id} text={message.text} />
          )
        ) : (
          <MyMessage key={message.id} text={message.text} />
        ),
      )}
    </ChatFrameWithSelectBox>
  );
};
