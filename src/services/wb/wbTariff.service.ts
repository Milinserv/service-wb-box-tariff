import { getBoxTariffs } from "#services/wb/wbApi.service.ts";
import logger from '#utils/logger/logger.js';
import saveTariffs from "#services/wb/wbTariff.repository.ts";
/**
 * Основная бизнес-логика:
 * - Получает тарифы из WB API
 * - Сохраняет их в БД
 */
export async function updateWBTariffsJob() {
    logger.info(`[WB] Fetching tariffs at ${new Date().toISOString()}...`);

    const tariffs = await getBoxTariffs();

    logger.info(tariffs);

    if (!tariffs) {
        logger.warn(tariffs, "[WB] Failed to fetch tariffs");
        return;
    }

    await saveTariffs(tariffs);
    logger.info(`[WB] Tariffs updated successfully at ${new Date().toISOString()}`);
}
