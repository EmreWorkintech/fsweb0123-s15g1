/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Roles', tbl=>{
    tbl.increments(),
    tbl.string('name', 32)
        .unique()
        .notNullable()
  })
    .alterTable('Users', tbl=>{
        tbl.integer('role_id')
            .notNullable()
            .unsigned()
            .defaultTo(2)
            .references('id')
            .inTable('Roles')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('Users', tbl=>{
    tbl.dropColumn('role_id')
  })
  .dropTableIfExists('Roles')
};
