import { env } from "@/utils/envConfig";
import { httpServer, io } from "@/app";
import logger from "@/utils/logger";
import socket from "@/socket";

const { NODE_ENV, HOST, PORT, CORS_ORIGIN } = env;

// the server instance
const server = httpServer.listen(PORT, async () => {
  logger.info(`cors origin value (${CORS_ORIGIN})`);
  logger.info(`Server (${NODE_ENV}) listening  on port http://${HOST}:${PORT}`);

  // initialize the socket.io connection
  socket({ io });
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
