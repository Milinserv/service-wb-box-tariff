import db from "#postgres/knex.ts";

/**
 * Сохраняет тарифы WB в БД
 * - вставляет копию в таблицу истории
 * - обновляет или создаёт запись на текущий день
 *
 * @param data - JSON данные тарифов
 */
const saveTariffs = async (data: any): Promise<void> => {
    const today = new Date().toISOString().slice(0, 10);

    await db.transaction(async (trx: any) => {
        // Сохраняем копию в историю
        await trx("wb_tariffs_history").insert({ data });

        // Проверяем, есть ли запись на текущий день
        const existing = await trx("wb_tariffs_daily")
            .where({
                date: today
            }).first();

        if (existing) {
            // Обновляем существующую запись
            await trx("wb_tariffs_daily")
                .where({
                    date: today
                }).update({
                    data, updated_at: trx.fn.now()
                });
        } else {
            // Вставляем новую запись
            await trx("wb_tariffs_daily")
                .insert({
                    date: today,
                    data,
                });
        }
    });
};

export default saveTariffs;
