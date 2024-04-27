const { table } = require("..");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', table=>{
    table.bigIncrements('id').primary();
    table.string('nama_barang', 255).notNullable();
    table.decimal('harga',10,2).notNullable;
    table.integer('stok').notNullable;
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('items');
};
