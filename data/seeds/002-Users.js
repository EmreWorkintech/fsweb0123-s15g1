/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Users').truncate()
  await knex('Roles').truncate()
  await knex('Roles').insert([
    {
      id: 1, 
      name: 'Admin'
    },
    {
      id: 2, 
      name: 'User'
    }
  ]);
  await knex('Users').insert([
    {
      id: 1, 
      username: 'Emre', 
      password: '$2a$08$ysnReB99ETxncITJL4pjeOibF27jZI2BFrXY5z9XFL9WzUxIFYVUK',
      role_id: 1
    },
    {
      id: 2, 
      username: 'Erdem', 
      password: '$2a$08$ysnReB99ETxncITJL4pjeOibF27jZI2BFrXY5z9XFL9WzUxIFYVUK',
      role_id: 2
    }
  ]);
};
