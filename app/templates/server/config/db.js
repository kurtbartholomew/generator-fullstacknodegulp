var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:8000/todo';

var client = new pg.Client(connectionString);
// client.connect();
// var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', function() { client.end(); });

//var Sequelize = require('sequelize');

// if(process.env.DATABASE_URL) {
//  var orm = new Sequelize(process.env.DATABASE_URL);
// } else {
  // Change needed: Change to requiring in a config.json file
  // so people's individual logins and db's can be stored
  // Using this means you must have a pickupDB database on your local
  // machine or it will fail.
//  var orm = new Sequelize('pickupDB', 'root','', {
//    dialect: 'mysql'
//  });
// }

//creates Sample Table
// var Sample = orm.define('Sample', {
//   username: Sequelize.STRING,
//   password: Sequelize.STRING,
//   email: Sequelize.STRING
// });

// orm.sync();

//exports tables so other files can reference
// exports.Sample = Sample;
module.exports = client;