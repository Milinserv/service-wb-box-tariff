import db from "#postgres/knex.js";

/**
 * Сохраняет тарифы WB в БД
 * - вставляет копию в таблицу истории
 * - обновляет или создаёт запись на текущий день
 *
 * @param data - JSON данные тарифов
 */
const saveTariffs = async (data: any): Promise<void> => {
    const today :string = new Date().toISOString().slice(0, 10);

    // Извлекаем массив тарифов
    const tariffs :any = data?.response?.data?.warehouseList ?? [];

    await db.transaction(async (trx: any) => {
        // Сохраняем полные данные в историю
        await trx("wb_tariffs_history").insert({ data });

        const existing = await trx("wb_tariffs_daily")
            .where({ date: today })
            .first();

        if (existing) {
            // Обновляем запись
            await trx("wb_tariffs_daily")
                .where({ date: today })
                .update({
                    data: JSON.stringify(tariffs),
                    updated_at: trx.fn.now()
                });
        } else {
            // Вставляем новую запись
            await trx("wb_tariffs_daily")
                .insert({
                    date: today,
                    data: JSON.stringify(tariffs)
                });
        }
    });
};

export default saveTariffs;
