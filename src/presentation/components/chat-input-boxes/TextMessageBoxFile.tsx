import { useRef, useState } from 'react';

interface Props {
  onSendMessage: (message: string, file: File) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string;
}

export const TextMessageBoxFile = ({ onSendMessage, placeholder, disableCorrections = false, accept }: Props) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) return;

    onSendMessage(message, selectedFile);
    setMessage('');
    setSelectedFile(null);
  };
  return (
    <form onSubmit={handleSendMessage} className="flex flex-row items-center h-16 bg-white/30 w-full px-4 rounded-xl">
      <div className="mr-3">
        <button
          type="button"
          className="flex items-center justify-center text-gray-400 hover:text-gray-300 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={e => {
            const file = e.target.files?.[0] || null;
            setSelectedFile(file);

            e.target.value = '';
          }}
        />
      </div>

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
        <button type="submit" className="btn-primary" disabled={!selectedFile}>
          {!selectedFile ? (
            <span className="mr-2">Send</span>
          ) : (
            <span className="mr-2">{selectedFile.name.substring(0, 10) + '...'}</span>
          )}

          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
