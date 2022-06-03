import knex from 'knex';
import mysql from 'mysql2';
import config from '../config.json';

const db_connect = knex({
  client: 'mysql',
  connection: config.database,
});

export default db_connect;
