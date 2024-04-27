const { table } = require("..");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('sales', table => {
        table.bigIncrements('id').primary();
        table.bigInteger('id_pelanggan').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.date('tanggal').notNullable;
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('sales');
};
