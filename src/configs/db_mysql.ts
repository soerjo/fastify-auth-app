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
  return new Promise<void>(res => {
    db.connect(err => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log("connected do db success...");
      res();
    });
  });
}

export function execQuery(
  query: string,
  params: Array<any>
): Promise<Array<any>> {
  return new Promise<Array<any>>((resolve, reject) => {
    try {
      db.query(query, params, (err, data) => {
        if (err) reject(err);
        let StringifyData = JSON.stringify(data);
        let ObjectData = JSON.parse(StringifyData);
        ObjectData.pop();
        resolve(ObjectData.map((obj: Array<any>) => obj[0]));
      });
    } catch (err) {
      console.log("error query", err);
      reject(err);
    }
  });
}
