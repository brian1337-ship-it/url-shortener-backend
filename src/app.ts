import cors from "cors";
import express, { type Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import logger from "@/utils/logger";
import { env } from "@/utils/envConfig";

const app: Express = express();

const httpServer = createServer(app);

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// const io = new Server(httpServer, {
//   cors: {
//     origin: env.CORS_ORIGIN,
//     credentials: true,
//   },
// });

// Routes
app.get("/", (_, res) =>
  res.send(`Server is up and running version ${env.HOST}`)
);

export { app, logger };
