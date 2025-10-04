export default function VideoUpload() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1>Upload your video here</h1>

        <input
          type="file"
          className="block w-full text-sm text-gray-700 rounded-lg border border-gray-300 p-2 mt-2 cursor-pointer bg-gray-500 mb-4"
        />
      </div>
    </div>
  );
}
