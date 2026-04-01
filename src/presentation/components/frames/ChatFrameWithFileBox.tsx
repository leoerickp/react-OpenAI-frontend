import type { PropsWithChildren } from 'react';
import { ChatFrame } from './ChatFrame';
import { ChatInternalFrame } from './ChatInternalFrame';
import { TextMessageBoxFile } from '../chat-input-boxes/TextMessageBoxFile';

interface Props extends PropsWithChildren {
  messages: unknown[];
  onSendMessage: (text: string, file: File) => void;
  isLoading: boolean;
  initialText: string;
  placeholder?: string;
  accept?: string;
}

export const ChatFrameWithFileBox = ({
  children,
  messages,
  onSendMessage,
  placeholder,
  isLoading,
  initialText,
  accept,
}: Props) => {
  return (
    <ChatFrame>
      <ChatInternalFrame messages={messages} isLoading={isLoading} initialText={initialText}>
        {children}
      </ChatInternalFrame>
      <TextMessageBoxFile onSendMessage={onSendMessage} placeholder={placeholder} accept={accept} />
    </ChatFrame>
  );
};
