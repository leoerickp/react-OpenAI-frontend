import { ChatFrameWithSelectBox, GptMessage, MyMessage } from '../../components';
import { useTranslate } from '../../hooks';

const languages = [
  { id: 'alemán', text: 'Alemán' },
  { id: 'árabe', text: 'Árabe' },
  { id: 'bengalí', text: 'Bengalí' },
  { id: 'francés', text: 'Francés' },
  { id: 'hindi', text: 'Hindi' },
  { id: 'inglés', text: 'Inglés' },
  { id: 'japonés', text: 'Japonés' },
  { id: 'mandarín', text: 'Mandarín' },
  { id: 'portugués', text: 'Portugués' },
  { id: 'ruso', text: 'Ruso' },
  { id: 'coreano', text: 'Coreano' },
  { id: 'italiano', text: 'Italiano' },
  { id: 'espaniol', text: 'Español' },
];

export const TranslatePage = () => {
  const { messages, isLoading, handlePost } = useTranslate();
  return (
    <ChatFrameWithSelectBox
      messages={messages}
      onSendMessage={handlePost}
      placeholder="Escribe aqui lo que deseas..."
      options={languages}
      isLoading={isLoading}
      initialText="¿Qué quieres que traduzca hoy?"
    >
      {messages.map((message, index) =>
        message.isGpt ? <GptMessage key={index} text={message.text} /> : <MyMessage key={index} text={message.text} />,
      )}
    </ChatFrameWithSelectBox>
  );
};
