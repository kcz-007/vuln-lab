import {z} from "zod";

export const healthQuerySchema = z.object({
    name: z.string().regex(/^[a-zA-Z]+$/).optional(),
});