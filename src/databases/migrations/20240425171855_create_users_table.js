/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table=>{
    table.bigIncrements('id').primary();
    table.string('nama_pelanggan', 255).notNullable();
    table.string('alamat', 255).notNullable();
    table.string('telepon', 15).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
