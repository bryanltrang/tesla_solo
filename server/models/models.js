const { Pool } = require('pg');

const PG_URI =
  'postgres://lusomqcn:F0_kFKaUJ0AxjjOEumI36LwmtdanOAy5@rajje.db.elephantsql.com/lusomqcn';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
