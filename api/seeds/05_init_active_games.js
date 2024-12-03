/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('active_games').del()
  await knex('active_games').insert([
    {game_id: 1}
  ]);
};
