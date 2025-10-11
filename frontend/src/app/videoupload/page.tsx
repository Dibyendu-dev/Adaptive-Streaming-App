"use client";

import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function VideoUpload() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [videoId, setVideoId] = useState<string | null>(null);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    setIsUploading(true);
    setUploadStatus("idle");

    try {
      const formData = new FormData();
      formData.append("video", file);
      const response = await axios.post(
        "http://localhost:3000/api/v1/videos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setUploadStatus("success");
      setVideoId(response.data.id || "sample-video"); // Assuming the response has an id field
    } catch (error) {
      console.log("Something went wrong", error);
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleStreamClick = () => {
    if (videoId) {
      router.push(`/stream/${videoId}`);
    }
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
            Upload Your
            <br />
            <span className="text-gray-600">Video</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-12">
            Select a video file to upload and start streaming with adaptive
            quality. Your video will be processed and ready for seamless
            playback.
          </p>

          <div className="bg-gray-50 rounded-2xl p-8 mb-8 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-gray-600 mb-4">
                Choose a video file to upload
              </p>
            </div>

            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="block w-full text-sm text-gray-700 rounded-lg border border-gray-300 p-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            />

            {isUploading && (
              <div className="mt-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                <span className="ml-3 text-gray-600">
                  Uploading and processing...
                </span>
              </div>
            )}

            {uploadStatus === "success" && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-green-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-800 font-medium">
                    Upload successful!
                  </span>
                </div>
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-red-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-red-800 font-medium">
                    Upload failed. Please try again.
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {uploadStatus === "success" && (
              <button
                onClick={handleStreamClick}
                className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors duration-200 min-w-[200px]"
              >
                Stream Video
              </button>
            )}

            <button
              onClick={handleBackToHome}
              className="bg-gray-200 text-gray-800 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-300 transition-colors duration-200 min-w-[200px]"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
