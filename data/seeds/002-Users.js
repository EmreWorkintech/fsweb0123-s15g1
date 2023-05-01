/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Users').truncate()
  await knex('Users').insert([
    {id: 1, username: 'Erdem', password: '$2a$08$ysnReB99ETxncITJL4pjeOibF27jZI2BFrXY5z9XFL9WzUxIFYVUK'}
  ]);
};
