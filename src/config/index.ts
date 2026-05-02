import dotenv from  "dotenv";
import { envSchema } from "./schema";
import { logger } from "../utils/logger";

dotenv.config();

const parsed = envSchema.safeParse(process.env);

if(!parsed.success) {
    console.error("Config validation error:", parsed.error);
    process.exit(1);
};

export const config = {
    port: Number(parsed.data?.PORT) || "3000",
    nodeEnv: parsed.data?.NODE_ENV || "development",
    db: {
        host: parsed.data?.DB_HOST,
        port: Number(parsed.data?.DB_PORT),
        user: parsed.data?.DB_USER,
        password: parsed.data?.DB_PASSWORD,
        database: parsed.data?.DB_NAME,
    }
   
}