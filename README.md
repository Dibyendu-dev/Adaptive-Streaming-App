# Adaptive Streaming App

This project is a full-stack adaptive video streaming application, featuring a backend built with Node.js, TypeScript, and ffmpeg, and a frontend built with Next.js. It enables efficient video upload, storage, and adaptive streaming to users based on their network conditions.

## Features
- **Video Upload:** Users can upload videos via the frontend, which are processed and stored by the backend.
- **Adaptive Streaming:** once video is uploaded, then we shold be able to process the video in a manner that we can later serve different resolution of this video.
- **Stream:** serve video chunk by chunk
- **REST API:** Backend exposes endpoints for video management and streaming.
- **Modern Frontend:** Next.js frontend for uploading and streaming videos.

## Project Structure
```
Adaptive-Streaming-App/
├── backend/        # Node.js, TypeScript, Prisma backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   └── config/
│   └── prisma/
├── frontend/       # Next.js frontend
│   ├── src/app/
│   │   ├── stream/[videoId]/
│   │   └── videoupload/
│   └── public/
```

## Getting Started

### Backend
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Set up the database using Prisma:
   ```bash
   npx prisma migrate dev
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend:
   ```bash
   npm run dev
   ```

## API Endpoints
- `POST /api/v1/videos/upload` - Upload a video
- `GET /api/v1/videos/:id/stream` - Stream a video

## Technologies Used
- **Backend:** Node.js, TypeScript, Express, Prisma, Multer
- **Processing:** FFMPEG
- **Frontend:** Next.js, React
- **Database:** Mongodb


