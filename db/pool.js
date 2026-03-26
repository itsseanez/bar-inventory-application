const {Pool} = require("pg");

module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: "Sean",
  database: "bar_inventory",
  password: "greenp45",
  port: 5432 // The default port
});