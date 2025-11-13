import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),

    POSTGRES_HOST: z.string().default("postgres"),
    POSTGRES_PORT: z.string().regex(/^[0-9]+$/).transform(Number).default("5432"),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),

    APP_PORT: z.string().regex(/^[0-9]+$/).transform(Number).default("3000"),

    WB_API_KEY: z.string().min(1, "WB_API_KEY is required"),
    GOOGLE_SERVICE_ACCOUNT: z.string().default("/secrets/google_sa.json"),
    SPREADSHEET_IDS: z.string(),
    EXPORT_CRON: z.string().default("*/15 * * * *"),
});

const parsed = envSchema.parse(process.env);

export const env = {
    NODE_ENV: parsed.NODE_ENV,
    PORT: parsed.APP_PORT,
    POSTGRES_HOST: parsed.POSTGRES_HOST,
    POSTGRES_PORT: parsed.POSTGRES_PORT,
    POSTGRES_USER: parsed.POSTGRES_USER,
    POSTGRES_PASSWORD: parsed.POSTGRES_PASSWORD,
    POSTGRES_DB: parsed.POSTGRES_DB,
    WB_API_KEY: parsed.WB_API_KEY,
    GOOGLE_SA: parsed.GOOGLE_SERVICE_ACCOUNT,
    SPREADSHEET_IDS: parsed.SPREADSHEET_IDS.split(",").filter(Boolean),
    EXPORT_CRON: parsed.EXPORT_CRON,
};

export default env;
