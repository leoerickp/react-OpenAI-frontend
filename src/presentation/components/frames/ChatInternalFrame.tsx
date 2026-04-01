import { useContentScroll } from '../../hooks';
import { GptMessage } from '../chat-bubbles/GptMessage';
import { TypingLoader } from '../loaders/TypingLoader';

interface Props {
  messages: unknown[];
  isLoading: boolean;
  children: React.ReactNode;
  initialText: string;
}

export const ChatInternalFrame = ({ children, messages, isLoading, initialText }: Props) => {
  const messagesEndRef = useContentScroll(messages);
  return (
    <div className="chat-messages">
      <div className="grid grid-cols-12 gap-y-2">
        <GptMessage text={initialText} />
        {children}
        {isLoading && <TypingLoader className="col-start-1 col-end-12 fade-in" />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
