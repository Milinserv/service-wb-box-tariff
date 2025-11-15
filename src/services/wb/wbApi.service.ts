import wbApi from "#api/WbApi.js";
import { WBTariffsResponse } from "#types/tariff.js";
import logger from "#utils/logger/logger.js";

/**
 * Получает тарифы Wildberries (короба)
 */
const getBoxTariffs = async () :Promise<WBTariffsResponse | null>=> {
    try {
        const dateParam = new Date().toISOString().split("T")[0];

        const response = await wbApi.get("/tariffs/box", {
            params: {
                date: dateParam
            },
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            logger.info("WB API error; status = " + error.response?.status + 'data = ' + error.response?.data);
        } else {
            logger.info("WB API network error: " + error.message);
        }
        return null;
    }
}

export default getBoxTariffs;