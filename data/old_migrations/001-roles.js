/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Roles').truncate();
  await knex('Users').truncate()
  await knex('Roles').insert([
    {RoleName: 'SuperAdmin'},
    {RoleName: 'Admin'},
    {RoleName: 'User'}
  ]);
  await knex('Users').insert([
    {FirstName: 'Emre',
      Surname: "Şahiner",
      Sinif: "10-Fen-A",
      OgrenciNo: 838,
      Email: "emre@wit.com.tr",
    }
  ]);
};
