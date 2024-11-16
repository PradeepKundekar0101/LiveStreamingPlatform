import express, { Request, Response } from "express";
import path from "path";
import WebSocket from "ws";
import { User } from "./service/user";
import http from "http";

const app = express();
app.use(express.static(path.resolve("./public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("Connection")
  const user = new User(ws);

  user.initHandle();
});

server.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
