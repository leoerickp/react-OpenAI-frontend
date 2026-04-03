import Markdown from 'react-markdown';

interface Props {
  imageUrl: string;
  alt: string;
  onImageSelected?: (imageUrl: string) => void;
  text?: string;
}

export const GptMessageImage = ({ imageUrl, alt, onImageSelected, text }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 shrink-0">G</div>
        <div className="relative ml-3 text-sm bg-black/75 pt-3 pb-2 px-4 rounded-xl shadow">
          <img
            src={imageUrl}
            alt={alt}
            className={`rounded-xl w-96 h-96 object-cover ${onImageSelected && 'cursor-pointer hover:scale-105 transition-all duration-300'}`}
            onClick={() => onImageSelected && onImageSelected(imageUrl)}
          />
          {text && <Markdown>{text}</Markdown>}
        </div>
      </div>
    </div>
  );
};
