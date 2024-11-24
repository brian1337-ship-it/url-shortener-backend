import { Server } from "socket.io";
import logger from "@/utils/logger";

const RETRY_INTERVAL = 5000;
const MAX_RETRIES = 5;

export const emitAndRetry = async (
  io: Server,
  event: string,
  data: string,
  retries = MAX_RETRIES
) => {
  return new Promise<void>((resolve, reject) => {
    let attempts = 0;

    const sendEvent = () => {
      attempts++;

      /** Emit the event and wait for acknowledgment.
       *  'ack' is an optional callback added that will fire when the message is received on the other side.
       *  If no acknowledgment is received, retry after a delay.
       *  If the maximum number of retries is reached, reject the promise.
       *  If acknowledgment is  received, resolve the promise.
       */
      io.emit(event, data, (ack: boolean) => {
        if (ack) {
          logger.info(`Acknowledgment received for message: ${event}`);
          resolve();
        } else if (attempts < retries) {
          logger.info(
            `No acknowledgment received for message: ${event}, retrying... (${attempts})`
          );
          setTimeout(sendEvent, RETRY_INTERVAL);
        } else {
          logger.info(
            `Failed to deliver message: ${event} after ${retries} attempts`
          );
          reject(
            new Error(
              `Failed to deliver message: ${event} after ${retries} attempts`
            )
          );
        }
      });
    };

    sendEvent();
  });
};
