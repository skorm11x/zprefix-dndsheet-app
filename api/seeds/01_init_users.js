/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const fs = require('fs');
const path = require('path');

const usersDir = path.join(__dirname, '../seed_data/users');
const users = [];

exports.seed = async function(knex) {
  await knex('users').del()
  fs.readdirSync(usersDir).forEach(file => {
    const user = require(path.join(usersDir, file));
    users.push(user);
  });

  await knex('users').insert(users);
};
