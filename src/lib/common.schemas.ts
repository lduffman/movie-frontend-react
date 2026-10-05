import { z } from "zod";

export const pageSchema = <T extends z.ZodType>(item: T) =>
  z.object({
    items: z.array(item),
    page: z.number().int(),
    size: z.number().int(),
    total: z.number().int(),
  });

export const searchText = z.union([z.string(), z.number()]).transform(String);
