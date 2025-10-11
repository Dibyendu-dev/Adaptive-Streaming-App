"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleUploadClick = () => {
    router.push("/videoupload");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-8 leading-tight">
            Adaptive Video
            <br />
            <span className="text-gray-600">Streaming</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
            Upload once, stream everywhere. Experience seamless HLS streaming
            with automatic quality adaptation for every device and connection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleUploadClick}
              className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors duration-200 min-w-[200px]"
            >
              Upload Video
            </button>         
          </div>
        </div>
      </main>


    </div>
  );
}
