import { config } from "dotenv";
config();

const port = process.env.PORT || "5000";

const db_host = process.env.DB_HOST || "localhost";
const db_port = process.env.DB_PORT || "3306";
const db_user = process.env.DB_USERNAME || "root";
const db_pass = process.env.DB_PASSWORD || "root123";
const db_database = process.env.DB_DATABASE || "mydb_app";

export const db_config = {
  host: db_host,
  port: parseInt(db_port),
  user: db_user,
  pass: db_pass,
  database: db_database,
};

export const server_config = {
  port: parseInt(port),
};

export default { db_config, server_config };
