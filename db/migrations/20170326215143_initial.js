
exports.up = function (knex, Promise) {
  return Promise.all([

    knex.schema.createTableIfNotExists('profiles', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.timestamps(true, true);
    }),

    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),

    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username', 100).nullable().unique();
      table.string('password', 100);
      table.string('token', 100);
      table.string('email', 100).nullable().unique()
      table.string('picture_url');
      table.string('profile', 100);
      table.timestamps(true, true);
    }),

    knex.schema.createTable('groups', function(table) {
      table.increments('id').primary();
      table.string('name', 100);
      table.string('leaving_from', 100);
      table.string('going_to', 100);
      table.string('email');
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('messages', function(table) {
      table.increments('id').primary();
      table.string('text', 100);
      table.integer('users_id').references('users.id').onDelete('CASCADE');
      table.integer('group_id').references('groups.id').onDelete('CASCADE');
      table.timestamps(true, true);
    })

  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('messages'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('groups'),
  ]);
};
