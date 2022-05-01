import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
// Get config from .env
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const db_connect = mysql.createConnection({
  host: DB_HOST, //host xampp
  user: DB_USER, //name new user
  password: DB_PASSWORD, //password new user
  database: DB_DATABASE, //database
});

db_connect.connect((error) => {
  if (error) throw error;
  console.log("DATABASE CONNECTED");
});

export default db_connect;
