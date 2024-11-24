import { object, string, TypeOf } from "zod";

export const urlSchema = {
  body: object({
    url: string({
      required_error: "URL is required",
    }).min(4, { message: "You must enter a valid URL" }),
  }),
  params: object({
    shortenedUrl: string({
      required_error: "Please provide a shortened URL",
    }).min(4, { message: "You must enter a valid URL" }),
  }),
};

export type RequestUrlBody = TypeOf<typeof urlSchema.body>;
export type RequestUrlParams = TypeOf<typeof urlSchema.params>;
