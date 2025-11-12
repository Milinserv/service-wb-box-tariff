import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),

    POSTGRES_HOST: z.string().default("postgres"),
    POSTGRES_PORT: z
        .string()
        .regex(/^[0-9]+$/)
        .transform(Number)
        .default("5432"),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),

    APP_PORT: z
        .string()
        .regex(/^[0-9]+$/)
        .transform(Number)
        .default("3000"),

    WB_API_KEY: z.string().min(1, "WB_API_KEY is required"),
    GOOGLE_SERVICE_ACCOUNT: z.string().default(
        "/secrets/google_sa.json"
    ),
    EXPORT_CRON: z.string().default("*/15 * * * *"),
});

const parsed = envSchema.parse(process.env);

export const env = {
    NODE_ENV: parsed.NODE_ENV,
    PORT: parsed.APP_PORT,
    DB: {
        host: parsed.POSTGRES_HOST,
        port: parsed.POSTGRES_PORT,
        user: parsed.POSTGRES_USER,
        password: parsed.POSTGRES_PASSWORD,
        database: parsed.POSTGRES_DB,
    },
    WB_API_KEY: parsed.WB_API_KEY,
    GOOGLE_SA: parsed.GOOGLE_SERVICE_ACCOUNT,
    EXPORT_CRON: parsed.EXPORT_CRON,
};

export default env;
