import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RequestUrlBody } from "./url.schema";
import { customAlphabet } from "nanoid";
import { env } from "@/utils/envConfig";
import { EVENTS } from "@/utils/constants";
import { emitAndRetry } from "../webSocket/emitAndRetry";
import { io } from "@/app";

const generateRandomCode = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyz",
  10
);

//Reverse lookup table for already encoded urls to avoid encoding the same url twice.
let shortUrlStore = new Map(),
  longUrlStore = new Map();

const getShortUrl = () => {
  // Generate a random 10 character code that accepts both letters and numbers.
  const code = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

  //Return  generated code appended to the server's base URL
  return `http://${HOST}:${PORT}/${code()}`;
};

const { HOST, PORT } = env;

/**
 * @desc    Shorten URL
 * @route   POST /url
 * @access  Public
 */
export async function shortenUrlHandler(
  req: Request<{}, {}, RequestUrlBody>,
  res: Response
) {
  const { url } = req.body;

  try {
    const encode = async (longUrl: string) => {
      // Check if the url has already been encoded before
      if (longUrlStore.has(longUrl)) return longUrlStore.get(longUrl);

      let shortUrl = getShortUrl();

      while (shortUrlStore.has(shortUrl)) shortUrl = getShortUrl();

      //Associate the short URL result with the URL sent by the client and persist it
      await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate asynchronous read/write operation
      shortUrlStore.set(shortUrl, longUrl);
      longUrlStore.set(longUrl, shortUrl);
      return shortUrl;
    };

    const shortenedUrl = await encode(url);

    // Emit the shortened URL to the client via socket.io
    await emitAndRetry(io, EVENTS.SERVER.SHORTENED_URL, shortenedUrl);

    return res
      .status(StatusCodes.OK)
      .send("Shortened URL sent to client via socket.io");
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
