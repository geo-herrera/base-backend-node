const { Pool } = require('pg')
import config from '../config';

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

export default {
  query: (text, params) => pool.query(text, params),
}