import { useState } from 'react';

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
}

export const TextMessageBox = ({ onSendMessage, placeholder, disableCorrections = false }: Props) => {
  const [message, setMessage] = useState('');
  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim().length === 0) return;

    onSendMessage(message);
    setMessage('');
  };
  return (
    <form onSubmit={handleSendMessage} className="flex flex-row items-center h-16 bg-white/30 w-full px-4 rounded-xl">
      <div className="grow">
        <div className="relative w-full">
          <input
            type="text"
            placeholder={placeholder}
            autoFocus
            name="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="flex w-full border border-black/50 bg-white/50 rounded-lg text-gray-800 focus:outline-none focus:border-cyan-800 pl-4 h-10"
            autoComplete={disableCorrections ? 'off' : 'on'}
            autoCorrect={disableCorrections ? 'off' : 'on'}
            spellCheck={disableCorrections ? 'false' : 'true'}
          />
        </div>
      </div>
      <div className="ml-4">
        <button type="submit" className="btn-primary">
          <span className="mr-2">Send</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
