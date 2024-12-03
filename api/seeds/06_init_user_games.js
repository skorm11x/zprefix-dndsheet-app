/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('user_games').del()
  await knex('user_games').insert([
    {user_id: 1, game_id: 1, character_id: 1},
    {user_id: 2, game_id: 1, character_id: 2},
  ]);
};
