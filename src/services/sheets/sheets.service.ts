import { getDailyTariffs } from "./sheets.repository.js";
import { updateSheetValues, clearSheet } from "./sheetsApi.service.js";
import env from "#config/env/env.js";
import logger from "#utils/logger/logger.js";

export async function updateTariffsSheets() {
    // массив объектов из БД
    const tariffs = await getDailyTariffs();

    if (!tariffs || !tariffs.length) {
        logger.info("[Sheets] No data to update");
        return;
    }

    // Заголовки столбцов
    const headers = [
        "geoName",
        "warehouseName",
        "boxStorageBase",
        "boxDeliveryBase",
        "boxStorageLiter",
        "boxDeliveryLiter",
        "boxStorageCoefExpr",
        "boxDeliveryCoefExpr",
        "boxDeliveryMarketplaceBase",
        "boxDeliveryMarketplaceLiter",
        "boxDeliveryMarketplaceCoefExpr"
    ];

    // Преобразуем данные в двумерный массив
    const values = tariffs.map((t: any) =>
        headers.map((key) => t[key] || "")
    );

    // Добавляем заголовки как первую строку
    const sheetValues = [headers, ...values];

    // Получаем ID Sheet
    const spreadsheetId = env.SPREADSHEET_ID;

    try {
        // Очистка листа
        await clearSheet(spreadsheetId, "stocks_coefs!A1");
        // Обновление значений
        await updateSheetValues(spreadsheetId, "stocks_coefs!A1", sheetValues);
    } catch (err: any) {
        logger.info('[Sheets] Error update: ' + err.message);
    }
}
