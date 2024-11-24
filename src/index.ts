import { env } from "@/utils/envConfig";
import { app, logger } from "@/app";

const { NODE_ENV, HOST, PORT } = env;

// the server instance
const server = app.listen(PORT, async () => {
  logger.info(`Server (${NODE_ENV}) listening  on port http://${HOST}:${PORT}`);

  // initialize the socket.io
  // socket({ io });
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
