import { useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBox, GptMessageSelectableImage } from '../../components';
import { useContentScroll } from '../../hooks';
import { imageGenerationUseCase, imageVariationUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export const ImageTunningPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    original: undefined as string | undefined,
    originalAlt: undefined as string | undefined,
    mask: undefined as string | undefined,
  });
  const messagesEndRef = useContentScroll(messages);

  const handleVariation = async () => {
    setIsLoading(true);
    const resp = await imageVariationUseCase(originalImageAndMask.originalAlt!);
    setIsLoading(false);

    if (resp && !resp.ok) {
      return;
    }

    setMessages(prev => [
      ...prev,
      {
        text: 'Variation',
        isGpt: true,
        info: {
          imageUrl: resp.url,
          alt: resp.alt,
        },
      } as Message,
    ]);
  };

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { text, isGpt: false }]);

    const { mask, original } = originalImageAndMask;

    const { ok, errorMessage, url, alt } = await imageGenerationUseCase(text, original, mask);
    setIsLoading(false);

    if (!ok) {
      setMessages(prev => [...prev, { text: errorMessage ?? 'Unknown error', isGpt: true }]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          text: alt ?? 'Generated image',
          isGpt: true,
          info: { imageUrl: url ?? '', alt: alt ?? '' },
        },
      ]);
    }
  };
  return (
    <>
      {originalImageAndMask.original && (
        <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
          <span>Editing</span>
          <img
            src={originalImageAndMask.mask ?? originalImageAndMask.original}
            alt="Original"
            className="border rounded-xl w-36 h-36"
          />
          <button onClick={handleVariation} className="btn-primary mt-2">
            Generate a variation
          </button>
        </div>
      )}
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            {/* Welcome */}
            <GptMessage text="¿Qué imagen deseas generar hoy?" />
            {messages.map((message, index) =>
              message.isGpt ? (
                //<GptMessageImage
                <GptMessageSelectableImage
                  key={index}
                  imageUrl={message.info?.imageUrl ?? ''}
                  onImageSelected={maskImageUrl =>
                    setOriginalImageAndMask({
                      original: message.info?.imageUrl,
                      originalAlt: message.info?.alt,
                      mask: maskImageUrl,
                    })
                  }
                />
              ) : (
                <MyMessage key={index} text={message.text} />
              ),
            )}

            {isLoading && <TypingLoader className="col-start-1 col-end-12 fade-in" />}

            <div ref={messagesEndRef} />
          </div>
        </div>
        <TextMessageBox onSendMessage={handlePost} placeholder="Escribe aqui lo que deseas..." disableCorrections />
      </div>
    </>
  );
};
