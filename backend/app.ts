import express, { type Request, type Response } from "express";
import expressWs from "express-ws";
import cors from "cors";

import docker from "./docker.ts";
import router from "./routes/container.ts";

const wsInstance = expressWs(express());
const app = wsInstance.app;

app.use(cors());
app.use(express.json());

// Websockets
app.ws("/ws/containers", (ws: any) => {
  const sendContainers = async () => {
    try {
      const containers = await docker.listContainers({ all: true });
      const externalContainers = containers.filter(
        (container) =>
          container.Labels?.["com.docker.compose.project"] !==
          "server-dashboard",
      );
      if (ws.readyState == ws.OPEN) {
        ws.send(JSON.stringify(externalContainers));
      }
    } catch (err) {
      console.error("Error fetching containers for ws:", err);
    }
  };

  sendContainers();

  const interval = setInterval(sendContainers, 1000);

  ws.on("message", () => {
    sendContainers();
  });

  ws.on("close", () => {
    clearInterval(interval);
    console.log("WebSocket client disconnected");
  });
});

app.use("/api/containers", router);

app.get("/", (req: Request, res: Response) => {
  res.send("API Running");
});

app.listen(3000);
