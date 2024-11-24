import express, { type Express } from "express";
import { processRequestBody } from "zod-express-middleware";
import { shortenUrlHandler } from "./url.controller";
import { urlSchema } from "./url.schema";

const router = express.Router();

// Get full URL

// Shorten URL
router.post("/", processRequestBody(urlSchema.body), shortenUrlHandler);

export default router;
