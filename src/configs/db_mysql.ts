import mysql from "mysql";
import { db_config } from "./config";

const db = mysql.createConnection({
  host: db_config.host,
  port: db_config.port,
  database: db_config.database,
  user: db_config.user,
  password: db_config.pass,
});

export async function dbConnection() {
  return new Promise<void>((res) => {
    db.connect((err) => {
      if (err) {
        console.log(err);
        setTimeout(dbConnection, 2000);
      }
      console.log("connected do db success...");
      res();
    });

    db.on("error", (err) => {
      console.log("db error: ", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        dbConnection();
      } else {
        process.exit(1);
      }
    });
  });
}

export function execQuery(
  query: string,
  params?: Array<any>
): Promise<Array<any>> {
  return new Promise<Array<any>>((resolve, reject) => {
    try {
      db.query(query, params, (err, data) => {
        if (err) reject(err);
        resolve(data.map((obj: Array<any>) => obj[0]));
      });
    } catch (err) {
      console.log("error query", err);
      reject(err);
    }
  });
}

export function justQuery(
  query: string,
  params?: Array<any>
): Promise<Array<any>> {
  return new Promise<Array<any>>((resolve, reject) => {
    try {
      db.query(query, params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    } catch (err) {
      console.log("error query", err);
      reject(err);
    }
  });
}
