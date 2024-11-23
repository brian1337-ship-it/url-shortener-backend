import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import logger from "@/utils/logger";
import { env } from "@/utils/envConfig";

const app: Express = express();
const { NODE_ENV, HOST, PORT } = env;

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Routes
app.get("/", (_, res) => res.send(`Server is up and running version ${HOST}`));

// the server instance
const server = app.listen(PORT, async () => {
  logger.info(`Server (${NODE_ENV}) listening  on port http://${HOST}:${PORT}`);
});

// signals to listen to for termination
const signals = ["SIGTERM", "SIGINT"];

const gracefulShutdown = (signal: string) => {
  process.on(signal, async () => {
    logger.info("Got signal", signal);
    server.close();

    logger.info("Server closed");

    process.exit(0);
  });
};

// if signal detected execute graceful shutdown
for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}

// export { app, logger };
