/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('games', (table) => {
    table.increments('id'),
    table.string('name'),
    table.integer('dm_id'),
    table.integer('environment_id'),
    table.foreign('dm_id').references('users.id').onDelete('CASCADE'),
    table.foreign('environment_id').references('environments.id').onDelete('CASCADE'),
    table.dateTime('start_date')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('games', table => {
        table.dropForeign('dm_id');
        table.dropForeign('environment_id');
    })
    .then(function() {
        return knex.schema.dropTableIfExists('games')
    })
};
