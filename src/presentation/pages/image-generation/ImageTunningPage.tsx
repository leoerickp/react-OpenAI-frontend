import { MyMessage, GptMessageSelectableImage, ChatFrameWithTextBox, ImagePreview } from '../../components';
import { useImageTunning } from '../../hooks';

export const ImageTunningPage = () => {
  const { messages, isLoading, handlePost, handleVariation, originalImageAndMask, setOriginalImageAndMask } =
    useImageTunning();
  return (
    <>
      {originalImageAndMask.original && (
        <ImagePreview originalImageAndMask={originalImageAndMask} handleVariation={handleVariation} />
      )}
      <ChatFrameWithTextBox
        messages={messages}
        onSendMessage={handlePost}
        placeholder="Escribe aqui lo que deseas..."
        isLoading={isLoading}
        initialText="¿Qué imagen deseas generar hoy?"
      >
        {messages.map(message =>
          message.isGpt ? (
            <GptMessageSelectableImage
              key={message.id}
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
            <MyMessage key={message.id} text={message.text} />
          ),
        )}
      </ChatFrameWithTextBox>
    </>
  );
};
