const dotenv = require("dotenv");
const mysql = require("mysql-await");
dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

module.exports = db;
