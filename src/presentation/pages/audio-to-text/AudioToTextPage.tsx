import { useState } from 'react';
import { GptMessage, MyMessage, TextMessageBoxFile, TypingLoader } from '../../components';
import { audioToTextUseCase } from '../../../core/use-cases/audio-to-text.use-case';
import { useContentScroll } from '../../hooks';

interface Message {
  text: string;
  isGpt: boolean;
}

export const AudioToTextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useContentScroll(messages);

  const handlePost = async (text: string, audioFile: File) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { text, isGpt: false }]);

    const data = await audioToTextUseCase(audioFile, text);
    setIsLoading(false);
    if (!data.ok) return;
    const gptMarkdownMessage = `
## Transcripción:
__Duración:__ ${Math.round(data.duration * 100) / 100} segundos
### El texto es:
${data.text}
`;

    setMessages(prev => [...prev, { text: gptMarkdownMessage, isGpt: true }]);

    for (const segment of data.segments) {
      const segmentMessage = `
__De ${Math.round(segment.start * 100) / 100} a ${Math.round(segment.end * 100) / 100} segundos:__
${segment.text}
      `;
      setMessages(prev => [...prev, { text: segmentMessage, isGpt: true }]);
    }
  };
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GptMessage text="Hola ¿Qué audio quieres convertir a texto hoy?" />
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
      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe aqui lo que deseas..."
        disableCorrections
        accept="audio/*"
      />
    </div>
  );
};
