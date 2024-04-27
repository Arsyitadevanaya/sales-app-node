/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('detail', table => {
        table.bigInteger('id_penjualan').unsigned().references('id').inTable('sales').onDelete('CASCADE');
        table.bigInteger('id_barang').unsigned().references('id').inTable('items').onDelete('CASCADE');
        table.integer('jumlah');
        table.decimal('subtotal',10,2);
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('detail');
};
