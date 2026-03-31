import { useState } from 'react';
import { GptMessage, MyMessage, TextMessageBoxSelect, TypingLoader } from '../../components';
import { translateTextUseCase } from '../../../core/use-cases/translate-text.use-case';
import { useContentScroll } from '../../hooks';

interface Message {
  text: string;
  isGpt: boolean;
}

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
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useContentScroll(messages);

  const handlePost = async (text: string, selectedOption: string) => {
    setIsLoading(true);
    const newMessage = `Traduce: ${text} al idioma ${selectedOption}`;
    setMessages(prev => [...prev, { text: newMessage, isGpt: false }]);

    const resp = await translateTextUseCase(text, selectedOption);

    setIsLoading(false);

    if (resp.ok) {
      setMessages(prev => [...prev, { text: resp.message, isGpt: true }]);
    } else {
      setMessages(prev => [...prev, { text: resp.message, isGpt: true }]);
    }
  };
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GptMessage text="¿Qué quieres que traduzca hoy?" />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            ),
          )}

          {isLoading && <TypingLoader className="col-start-1 col-end-12 fade-in" />}

          <div ref={messagesEndRef} />
        </div>
      </div>
      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe aqui lo que deseas..."
        disableCorrections
        options={languages}
      />
    </div>
  );
};
