import { Server, Socket } from "socket.io";
import logger from "@/utils/logger";
import { EVENTS } from "@/utils/constants";

// Listen for socket connections
const socket = ({ io }: { io: Server }) => {
  logger.info(`Sockets enabled`);

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`Client connected ${socket.id}`);

    socket.on(EVENTS.disconnect, () => {
      logger.info(`Client disconnected ${socket.id}`);
    });
  });
};

export default socket;
