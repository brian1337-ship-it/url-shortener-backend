import pino from "pino";

// our logger
const logger = pino({
  name: "server start",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export default logger;
