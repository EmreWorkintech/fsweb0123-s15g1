/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
var knexCleaner = require('knex-cleaner');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knexCleaner.clean(knex, {
    mode: 'truncate',
    ignoreTables: ["knex_migrations", "knex_migrations_lock"]
  });
};
