/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('games').del()
  await knex('games').insert([
    {id: 1, name: 'Rise of the Runelords', dm_id: 1, environment_id: 1, start_date: '2024-12-03 14:30:00'}
  ]);
};
