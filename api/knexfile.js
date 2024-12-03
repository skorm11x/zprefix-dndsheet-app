require('dotenv').config();

const connectionString = process.env.DB_CONNECTION_STRING;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      password: 'docker',
      user: 'postgres',
      port: 5432,
      database: 'pathfinder_sheet_db'
    }
  },

  staging: {
    client: 'postgresql',
    connection: connectionString,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: connectionString,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }


};
