import Markdown from 'react-markdown';

interface Props {
  text: string;
  audioUrl: string | undefined;
}

export const GptMessageAudio = ({ text, audioUrl }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 shrink-0">G</div>
        <div className="relative ml-3 text-sm bg-black/75 pt-3 pb-2 px-4 rounded-xl shadow">
          <Markdown>{text}</Markdown>
          {audioUrl && (
            <div className="mt-2">
              <audio src={audioUrl} controls className="w-full" autoPlay></audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
