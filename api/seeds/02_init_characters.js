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
  //There is a special character we ensure always exist with character_id = 0, "GOD" or the DM.
  //amusingly, this implies that the DM itself does infact have a stat block. Queue JRPG shenanigans.
  await knex('characters').insert({
    fname: 'GOD', lname: 'GOD', race: 'Divine', class: 'Deity',
    alignment: 'True Neutral', 'deity' : 'Self', str: '9999',
    dex: '9999', con: '9999', int: '9999', wis: '9999', cha: '9999',
    background: 'DM for game session from material plane'
  });
  
  fs.readdirSync(charactersDir).forEach(file => {
    const character = require(path.join(charactersDir, file));
    characters.push(character);
  });

  await knex('characters').insert(characters);
};
