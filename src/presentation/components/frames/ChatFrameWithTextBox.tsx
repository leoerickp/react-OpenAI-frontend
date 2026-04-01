import type { PropsWithChildren } from 'react';
import { TextMessageBox } from '../chat-input-boxes/TextMessageBox';
import { ChatFrame } from './ChatFrame';
import { ChatInternalFrame } from './ChatInternalFrame';

interface Props extends PropsWithChildren {
  messages: unknown[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  initialText: string;
  placeholder?: string;
}

export const ChatFrameWithTextBox = ({
  children,
  messages,
  onSendMessage,
  placeholder,
  isLoading,
  initialText,
}: Props) => {
  return (
    <ChatFrame>
      <ChatInternalFrame messages={messages} isLoading={isLoading} initialText={initialText}>
        {children}
      </ChatInternalFrame>
      <TextMessageBox onSendMessage={onSendMessage} placeholder={placeholder} disableCorrections />
    </ChatFrame>
  );
};
