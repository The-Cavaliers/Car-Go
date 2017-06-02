const dbConfig = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'thesis_devel',
    charset: 'utf8',
  },
};

module.exports = dbConfig;
