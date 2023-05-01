/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('Users', tbl=>{
    tbl.decimal('Bakiye')
        .notNullable()
        .unsigned()
        .defaultTo(0);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('Users', tbl=>{
    tbl.dropColumn('Bakiye');
  })
};
