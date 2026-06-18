import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env);
console.log("Host:", process.env.DB_HOST);
console.log("Port:", process.env.DB_PORT);
console.log("User:", process.env.DB_USER);
console.log("Password:", process.env.DB_PASSWORD);
console.log("Database:", process.env.DB_NAME);

const db = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect()
  .then(() => console.log("✅ PostgreSQL Connected"))
  .catch((err) => console.log(err));

export default db;