interface Props {
  originalImageAndMask: {
    original: string | undefined;
    originalAlt: string | undefined;
    mask: string | undefined;
  };
  handleVariation: () => void;
}

export const ImagePreview = ({ originalImageAndMask, handleVariation }: Props) => {
  return (
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
  );
};
