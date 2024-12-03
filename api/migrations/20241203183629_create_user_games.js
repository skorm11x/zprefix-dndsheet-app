/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_games', (table) => {
    table.increments('id'),
    table.integer('user_id'),
    table.integer('game_id'),
    table.integer('character_id'),
    table.foreign('user_id').references('users.id').onDelete('CASCADE'),
    table.foreign('game_id').references('games.id').onDelete('CASCADE'),
    table.foreign('character_id').references('characters.id').onDelete('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('user_games', table => {
    table.dropForeign('user_id');
    table.dropForeign('game_id');
    table.dropForeign('character_id');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('user_games')
  })
};
