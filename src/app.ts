import cors from "cors";
import express, { type Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import { env } from "@/utils/envConfig";
import urlRoute from "@/modules/url/url.route";

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  connectionStateRecovery: {}, // will try to restore the state of a client when it reconnects
  cors: {
    origin: env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Routes
app.use("/url", urlRoute);

export { httpServer, io };
