import cors from "cors";
import express, { type Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import logger from "@/utils/logger";
import { env } from "@/utils/envConfig";
import urlRoute from "@/modules/url.route";

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
app.use("/url", urlRoute);

export { app, logger };
