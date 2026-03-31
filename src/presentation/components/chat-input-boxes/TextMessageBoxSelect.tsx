import { useState } from 'react';

interface Props {
  onSendMessage: (message: string, selectedOption: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
}

export const TextMessageBoxSelect = ({ onSendMessage, placeholder, disableCorrections = false, options }: Props) => {
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim().length === 0) return;
    if (selectedOption === '') return;

    onSendMessage(message, selectedOption);
    setMessage('');
  };
  return (
    <form onSubmit={handleSendMessage} className="flex flex-row items-center h-16 bg-white/30 w-full px-4 rounded-xl">
      <div className="grow">
        <div className="flex w-full">
          <input
            type="text"
            placeholder={placeholder}
            autoFocus
            name="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full border border-black/50 bg-white/50 rounded-lg text-gray-800 focus:outline-none focus:border-cyan-800 pl-4 h-10"
            autoComplete={disableCorrections ? 'off' : 'on'}
            autoCorrect={disableCorrections ? 'off' : 'on'}
            spellCheck={disableCorrections ? 'false' : 'true'}
          />
          <select
            name="select"
            id="select"
            className="w-2/5 ml-4 border rounded-lg border-black/50 bg-white/50 text-gray-800 focus:outline-none focus:border-cyan-800 pl-4 h-10"
            value={selectedOption}
            onChange={e => setSelectedOption(e.target.value)}
          >
            <option value="">Choose an option</option>
            {options.map(option => (
              <option key={option.id} value={option.id}>
                {option.text}
              </option>
            ))}
          </select>
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
