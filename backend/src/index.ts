import express, { Express, Request, Response } from "express";
import { PORT } from "./config/server.config";

const app: Express = express();

app.get("/ping", (_req: Request, res: Response) => {
  res.json({
    message: "pong",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
