/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('characters', (table) => {
        table.increments('character_id'),
        table.string('fname'),
        table.string('lname'),
        table.string('race'),
        table.string('class'),
        table.string('alignment'),
        table.string('deity'),
        table.integer('str'),
        table.integer('dex'),
        table.integer('con'),
        table.integer('int'),
        table.integer('wis'),
        table.integer('cha'),
        table.string('background')
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('characters')
};
