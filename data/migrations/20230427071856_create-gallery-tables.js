/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Cars', tbl => {
    tbl.increments();
    tbl.string('car_name', 64)
        .notNullable();
  })
    .createTable('Galleries', tbl=> {
        tbl.increments();
        tbl.string('gallery_name', 64)
        .notNullable();
    })
    .createTable('Gallery_Cars', tbl=>{
        tbl.integer('car_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('Cars')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.integer('gallery_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('Galleries')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
        tbl.primary(["car_id","gallery_id"]);
    })
    .createTable('Revenues', tbl=> {
        tbl.increments();
        tbl.integer('revenue')
            .unsigned()
            .notNullable()
            .defaultTo(0);
        tbl.integer('gallery_id')
            .notNullable()
            .unsigned()
            .unique()
            .references('id')
            .inTable('Galleries')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Revenues')
                    .dropTableIfExists('Gallery_Cars')
                    .dropTableIfExists('Galleries')
                    .dropTableIfExists('Cars')
};
