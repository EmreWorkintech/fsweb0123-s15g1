/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Users', tbl => {
    tbl.increments();
    tbl.string('FirstName',128)
        .notNullable();
    tbl.string('Surname',128)
        .notNullable();
    tbl.string('Sinif', 32)
        .notNullable();
    tbl.string('Email',128)
        .notNullable()
        .unique();
    tbl.integer('OgrenciNo')
        .notNullable()
        .unique()
        .unsigned();
    tbl.string('Okul');
    tbl.string('Sehir', 32)
        .notNullable()
        .defaultTo('İstanbul');
    tbl.timestamps();
    tbl.timestamp('deleted_at');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Users')
};
