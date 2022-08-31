import { config } from "dotenv";
config();

const port = process.env.PORT || "5000";
const client_url = process.env.CLIENT_URL || "http://localhost:3000";
const server_url = process.env.SERVER_URL || "http://localthost:4000";

const db_host = process.env.DB_HOST || "localhost";
const db_port = process.env.DB_PORT || "3306";
const db_user = process.env.DB_USERNAME || "root";
const db_pass = process.env.DB_PASSWORD || "root123";
const db_database = process.env.DB_DATABASE || "mydb_app";

const mail_password = process.env.MAIL_PASSWORD;
const mail_email = process.env.MAIL_EMAIL;

export const db_config = {
  host: db_host,
  port: parseInt(db_port),
  user: db_user,
  pass: db_pass,
  database: db_database,
};

export const server_config = {
  port: parseInt(port),
  client_url: client_url,
  server_url: server_url,
};

export const mail_config = {
  email: mail_email,
  pass: mail_password,
};

export default { db_config, server_config, mail_config };
