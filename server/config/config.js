var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'shortlydb',
    charset: 'utf8',
    filename: path.join(__dirname, '../db/billSpliter.sqlite')
  }
});

db.knex.schema.hasTable('roommates').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('roommates', function (person) {
      person.increments('id').primary();
      person.string('name', 255);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('payments').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('payments', function (payment) {
      payment.increments('id').primary();
      payment.string('item', 255);
      payment.string('payer', 255);
      payment.integer('total', 255);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;