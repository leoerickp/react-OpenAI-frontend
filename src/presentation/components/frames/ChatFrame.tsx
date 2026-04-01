import type { PropsWithChildren } from 'react';

export const ChatFrame = ({ children }: PropsWithChildren) => {
  return <div className="chat-container">{children}</div>;
};
