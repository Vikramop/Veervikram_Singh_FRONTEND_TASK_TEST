import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const PhotoId = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);

  async function startCamera() {
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(currentStream);
    } catch (err) {
      alert('Error accessing webcam: ' + (err as Error).message);
    }
  }

  // Effect to update video element when stream changes
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((error) => {
        console.error('Error attempting to play video:', error);
      });
    }
  }, [stream]);

  function capturePhoto() {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');

    setPhotoDataUrl(dataUrl);

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg w-fit mx-auto -translate-y-1/2 absolute top-1/2 left-1/2 -translate-x-1/2">
      <p className="font-semibold text-gray-700 mb-3">
        Hold your identity document steady and take a clear photo
      </p>
      {!stream && !photoDataUrl && (
        <button
          onClick={startCamera}
          className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-2 px-6 rounded-lg transition-all shadow w-fit"
        >
          Open Camera
        </button>
      )}

      {stream && (
        <>
          <video
            ref={videoRef}
            className="rounded border"
            width="320"
            height="240"
            muted
            playsInline
          />
          <button
            onClick={capturePhoto}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg transition-all shadow w-fit"
          >
            Capture Photo
          </button>
        </>
      )}

      {photoDataUrl && (
        <>
          <Image
            src={photoDataUrl}
            alt="Captured"
            className="mt-4 w-52 h-52 object-contain rounded border"
            width={52}
            height={52}
          />
          <button
            onClick={() => setPhotoDataUrl(null)}
            className="mt-2 text-yellow-600 underline"
          >
            Retake
          </button>
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PhotoId;
