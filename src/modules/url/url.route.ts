import express, { type Express } from "express";
import {
  processRequestBody,
  processRequestParams,
} from "zod-express-middleware";
import { getFullUrlHandler, shortenUrlHandler } from "./url.controller";
import { urlSchema } from "./url.schema";

const router = express.Router();

// Shorten URL
router.post("/", processRequestBody(urlSchema.body), shortenUrlHandler);

// Get full URL
router.get("/:code", processRequestParams(urlSchema.params), getFullUrlHandler);

export default router;
