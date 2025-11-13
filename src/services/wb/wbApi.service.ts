import wbApi from "#api/WbApi.ts";
import { WBTariffsResponse } from "#types/tariff.ts";
import logger from "#utils/logger/logger.js";

/**
 * Получает тарифы Wildberries (короба)
 */
export async function getBoxTariffs(): Promise<WBTariffsResponse | null> {
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
            logger.error(
                { status: error.response?.status, data: error.response?.data },
                "WB API error"
            );
        } else {
            console.error("WB API network error:", error.message);
        }
        return null;
    }
}
