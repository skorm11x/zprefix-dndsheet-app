/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const fs = require('fs');
const path = require('path');

const environmentsDir = path.join(__dirname, '../seed_data/environments/generic');
let environments = [];

exports.seed = async function(knex) {
  await knex('environments').del()
  fs.readdirSync(environmentsDir).forEach(file => {
    const environment = require(path.join(environmentsDir, file));
    environments.push(environment);
  });

  await knex('environments').insert(environments);
};
