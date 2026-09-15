const db = require('./db');

db.query('SELECT NOW()')
  .then(({ rows }) => console.log('Database connected:', rows[0]))
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exitCode = 1;
  })
  .finally(() => db.end());
