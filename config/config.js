// {
//   "development": {
//     "database": "wodup",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "test": {
//     "database": "wodup_test",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "production": {
//     "database": "wodup_production",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   }
// }

const config = {
  development: {
    database: 'wodup_dev',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    database: 'wodup_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};

if (process.env.DATABASE_URL) {
  const [
    ,
    username,
    password,
    host,
    port,
    database
  ] = process.env.DATABASE_URL
    .match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

  Object.assign(config, {
    production: {
      username,
      password,
      host,
      port,
      database,
      dialect: 'postgres'
    }
  });
}

module.exports = config;
