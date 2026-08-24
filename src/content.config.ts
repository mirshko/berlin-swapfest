/* eslint-disable unicorn/max-nested-calls */
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const events = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content",
  }),
  schema: z.object({
    date: z.iso.date(),
    location: z.string(),
    photos: z.array(z.object({ fileName: z.string(), alt: z.string() })),
  }),
});

export const collections = { events };
