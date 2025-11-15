import { migrate, seed } from "#postgres/knex.js";
import cron from "node-cron";
import { updateTariffsSheets } from "#services/sheets/sheets.service.js";
import { updateWBTariffsJob } from "#services/wb/wbTariff.service.js";
import logger from "#utils/logger/logger.js";

await migrate.latest();
await seed.run();

// Ежечасное обновление тарифов в БД
cron.schedule("0 * * * *", async () => {
    try {
        await updateWBTariffsJob();
    } catch (error: any) {
        logger.error("[Cron] Hourly WB tariffs update error:", error);
    }
});

// Ежедневное обновление Google Sheets (например, в 00:10)
cron.schedule("10 0 * * *", async () => {
    try {
        await updateTariffsSheets();
    } catch (error: any) {
        logger.error("[Cron] Daily Google Sheets update error:", error);
    }
});