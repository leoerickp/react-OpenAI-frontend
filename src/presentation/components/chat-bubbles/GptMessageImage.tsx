import Markdown from 'react-markdown';

interface Props {
  text: string;
  imageUrl: string;
  alt: string;
}

export const GptMessageImage = ({ text, imageUrl, alt }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 shrink-0">G</div>
        <div className="relative ml-3 text-sm bg-black/75 pt-3 pb-2 px-4 rounded-xl shadow">
          <Markdown>{text}</Markdown>
          <img src={imageUrl} alt={alt} className="mt-2 rounded-xl w-96 h-96 object-cover" />
        </div>
      </div>
    </div>
  );
};
