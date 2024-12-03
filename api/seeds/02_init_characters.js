/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const fs = require('fs');
const path = require('path');

const charactersDir = path.join(__dirname, '../seed_data/characters');
let characters = [];

exports.seed = async function(knex) {
  await knex('characters').del()
  fs.readdirSync(charactersDir).forEach(file => {
    const character = require(path.join(charactersDir, file));
    characters.push(character);
  });

  await knex('characters').insert(characters);
};
