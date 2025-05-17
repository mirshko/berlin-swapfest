import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content",
  }),
  schema: z.object({
    date: z.string().date(),
    location: z.string(),
    photos: z.array(
      z.object({
        fileName: z.string(),
        alt: z.string(),
      }),
    ),
  }),
});

export const collections = { events };
