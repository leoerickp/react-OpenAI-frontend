import { useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect, GptMessageAudio } from '../../components';
import { textToAudioUseCase } from '../../../core/use-cases';
import { useContentScroll } from '../../hooks';

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

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: 'text';
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audioUrl?: string;
  type: 'audio';
}

type Message = TextMessage | AudioMessage;

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useContentScroll(messages);

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { text, isGpt: false, type: 'text' }]);

    const { ok, audioUrl, errorMessage } = await textToAudioUseCase(text, selectedVoice);

    setIsLoading(false);

    if (ok) {
      setMessages(prev => [...prev, { text: `${selectedVoice} - ${text}`, isGpt: true, audioUrl, type: 'audio' }]);
    } else {
      setMessages(prev => [...prev, { text: errorMessage!, isGpt: true, type: 'text' }]);
    }
  };
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GptMessage text={disclaimer} />
          {messages.map((message, index) =>
            message.isGpt ? (
              message.type === 'audio' ? (
                <GptMessageAudio key={index} text={message.text} audioUrl={message.audioUrl} />
              ) : (
                <GptMessage key={index} text={message.text} />
              )
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
        options={voices}
      />
    </div>
  );
};
