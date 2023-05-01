/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
 
  await knex('Revenues').truncate()
  await knex('Cars').truncate()
  await knex('Galleries').truncate()
  await knex('Gallery_Cars').truncate()
  await knex('Cars').insert([
    {id: 1, car_name: 'Volvo'},
    {id: 2, car_name: 'VW'},
    {id: 3, car_name: 'Opel'}
  ]);
  await knex('Galleries').insert([
    {id: 1, gallery_name: 'Merve Otomotiv'},
    {id: 2, gallery_name: 'Ali Oto'},
    {id: 3, gallery_name: 'Emre Otomotiv'}
  ]);
  await knex('Gallery_Cars').insert([
    {car_id: 1, gallery_id:1 },
    {car_id: 1, gallery_id:2 },
    {car_id: 2, gallery_id:1 },
    {car_id: 3, gallery_id:3 }
  ]);
  await knex('Revenues').insert([
    {id: 1, revenue: 200000, gallery_id: 1},
    {id: 2, revenue: 300000, gallery_id: 2},
    {id: 3, revenue: 750000, gallery_id: 3}
  ]);
};
