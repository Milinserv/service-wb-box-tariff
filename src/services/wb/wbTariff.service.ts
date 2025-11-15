import getBoxTariffs from "#services/wb/wbApi.service.js";
import logger from '#utils/logger/logger.js';
import saveTariffs from "#services/wb/wbTariff.repository.js";

/**
 * Основная бизнес-логика:
 * - Получает тарифы из WB API
 * - Сохраняет их в БД
 */
export async function updateWBTariffsJob() {
    const tariffs = await getBoxTariffs();

    if (!tariffs) {
        logger.info("[WB] Failed to fetch tariffs");
        return;
    }

    await saveTariffs(tariffs);
}
