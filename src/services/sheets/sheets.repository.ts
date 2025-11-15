import db from "#postgres/knex.js";

/**
 * Получает тарифы из БД
 */
export async function getDailyTariffs(): Promise<any[]> {
    const today = new Date().toISOString().slice(0, 10);
    const row = await db("wb_tariffs_daily")
        .where({ date: today })
        .first();

    if (!row || !row.data) return [];

    const data: any[] = Array.isArray(row.data) ? row.data : JSON.parse(row.data);

    return data.sort((a, b) => {
        // сортируем по coef
        const coefA = a.response?.data?.warehouseList?.[0]?.boxDeliveryCoefExpr || 0;
        const coefB = b.response?.data?.warehouseList?.[0]?.boxDeliveryCoefExpr || 0;
        return coefA - coefB;
    });
}
