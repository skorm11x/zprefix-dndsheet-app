/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('active_games', (table) => {
    table.increments('id'),
    table.integer('game_id'),
    table.foreign('game_id').references('games.id').onDelete('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('active_games', (table) => {
    table.dropForeign('game_id');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('active_games')
  })
};
