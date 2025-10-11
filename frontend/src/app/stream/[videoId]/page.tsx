"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HLS from "hls.js";

export default function Page() {
  const params = useParams<{ videoId: string }>();
  const router = useRouter();
  const videoId = params.videoId;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoId && HLS.isSupported()) {
      const hls = new HLS();

      hls.on(HLS.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        setHasError(false);
      });

      hls.on(HLS.Events.ERROR, (event, data) => {
        console.error("HLS error:", data);
        setIsLoading(false);
        setHasError(true);
      });

      hls.loadSource(`http://localhost:3000/output/${videoId}/master.m3u8`);
      hls.attachMedia(videoRef.current!);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  }, [videoId]);

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleUploadNew = () => {
    router.push("/videoupload");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
            Video
            <br />
            <span className="text-gray-600">Streaming</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-12">
            Watch your video with adaptive streaming quality. Experience
            seamless playback optimized for your device and connection.
          </p>

          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Video ID: <span className="text-gray-600">{videoId}</span>
              </h2>
            </div>

            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading video...</p>
                  </div>
                </div>
              )}

              {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center p-8">
                    <svg
                      className="mx-auto h-16 w-16 text-red-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Video not available
                    </h3>
                    <p className="text-gray-600 mb-4">
                      The video might still be processing or the file doesnt
                      exist.
                    </p>
                    <button
                      onClick={handleUploadNew}
                      className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                      Upload New Video
                    </button>
                  </div>
                </div>
              )}

              <video
                controls
                className={`w-full max-w-4xl mx-auto rounded-lg shadow-lg ${
                  isLoading || hasError ? "opacity-0" : "opacity-100"
                } transition-opacity duration-300`}
                ref={videoRef}
                style={{ aspectRatio: "16/9" }}
                onLoadStart={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleBackToHome}
              className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors duration-200 min-w-[200px]"
            >
              Back to Home
            </button>

            <button
              onClick={handleUploadNew}
              className="bg-gray-200 text-gray-800 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-300 transition-colors duration-200 min-w-[200px]"
            >
              Upload New Video
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
