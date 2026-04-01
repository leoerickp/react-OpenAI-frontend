import { useEffect, useRef, useState } from 'react';

interface Props {
  imageUrl: string;
  onImageSelected?: (imageUrl: string) => void;
}

export const GptMessageSelectableImage = ({ imageUrl, onImageSelected }: Props) => {
  const originalImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageUrl;

    originalImageRef.current = image;

    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [imageUrl]);

  const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(true);

    // Get mouse coordinates relative to the canvas
    const startX = event.clientX - canvasRef.current!.getBoundingClientRect().left;
    const startY = event.clientY - canvasRef.current!.getBoundingClientRect().top;

    setCoords({ x: startX, y: startY });
  };

  const onMouseUp = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current!;
    const url = canvas.toDataURL('image/png');
    // console.log(url);
    // https://jaredwinick.github.io/base64-image-viewer/
    onImageSelected?.(url);
  };
  const onMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) return;

    const currentX = event.clientX - canvasRef.current!.getBoundingClientRect().left;
    const currentY = event.clientY - canvasRef.current!.getBoundingClientRect().top;

    // Calculate high and width of the rectangle
    const width = currentX - coords.x;
    const height = currentY - coords.y;

    const canvaWidth = canvasRef.current!.width;
    const canvaHeight = canvasRef.current!.height;

    // Clear canvas
    const ctx = canvasRef.current!.getContext('2d')!;

    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.drawImage(originalImageRef.current!, 0, 0, canvaWidth, canvaHeight);

    // Draw the rectangle, but in this case, we will clear the space
    //ctx.fillRect(coords.x, coords.y, width, height);
    ctx.clearRect(coords.x, coords.y, width, height);
  };

  const resetCanvas = () => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.drawImage(originalImageRef.current!, 0, 0, canvasRef.current!.width, canvasRef.current!.height);

    onImageSelected?.(imageUrl);
  };
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 shrink-0">G</div>
        <div className="relative ml-3 text-sm bg-black/75 pt-3 pb-2 px-4 rounded-xl shadow">
          <canvas
            ref={canvasRef}
            width={1024}
            height={1024}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          />
          <button className="btn-primary mt-2" onClick={resetCanvas}>
            Remove selection
          </button>
        </div>
      </div>
    </div>
  );
};
