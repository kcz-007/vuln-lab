import dotenv from  "dotenv";
import { envSchema } from "./schema";
import { logger } from "../utils/logger";

dotenv.config();

const parsed = envSchema.safeParse(process.env);

if(!parsed.success) {
    logger.error({
        message: "config error",
        error: parsed.error,
    })
};

export const config = {
    port: Number(parsed.data?.PORT) || "3000",
    nodeEnv: parsed.data?.NODE_ENV || "development",
    databaseUrl: parsed.data?.DATABASE_URL,
}