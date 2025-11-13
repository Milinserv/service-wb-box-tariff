/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    const historyExists = await knex.schema.hasTable("wb_tariffs_history");
    if (!historyExists) {
        await knex.schema.createTable("wb_tariffs_history", (table) => {
            table.increments("id").primary();
            table.jsonb("data").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
        });
    }

    // Таблица тарифов на текущий день
    const dailyExists = await knex.schema.hasTable("wb_tariffs_daily");
    if (!dailyExists) {
        await knex.schema.createTable("wb_tariffs_daily", (table) => {
            table.increments("id").primary();
            table.date("date").notNullable().unique();
            table.jsonb("data").notNullable();
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        });
    }
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists("wb_tariffs_daily");
    await knex.schema.dropTableIfExists("wb_tariffs_history");
}
