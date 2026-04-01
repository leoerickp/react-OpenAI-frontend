import type { PropsWithChildren } from 'react';
import { ChatFrame } from './ChatFrame';
import { ChatInternalFrame } from './ChatInternalFrame';
import { TextMessageBoxSelect } from '../chat-input-boxes/TextMessageBoxSelect';

interface Props extends PropsWithChildren {
  messages: unknown[];
  onSendMessage: (text: string, selectedOption: string) => void;
  isLoading: boolean;
  initialText: string;
  placeholder?: string;
  options: { id: string; text: string }[];
}

export const ChatFrameWithSelectBox = ({
  children,
  messages,
  onSendMessage,
  placeholder,
  isLoading,
  initialText,
  options,
}: Props) => {
  return (
    <ChatFrame>
      <ChatInternalFrame messages={messages} isLoading={isLoading} initialText={initialText}>
        {children}
      </ChatInternalFrame>
      <TextMessageBoxSelect
        onSendMessage={onSendMessage}
        placeholder={placeholder}
        disableCorrections
        options={options}
      />
    </ChatFrame>
  );
};
