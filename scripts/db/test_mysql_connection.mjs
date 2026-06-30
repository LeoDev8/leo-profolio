import mysql from "mysql2/promise";

import { getConnectionOptions } from "./config.mjs";


const options = getConnectionOptions()

const connection = await mysql.createConnection(options);


try {

  console.log("Starting to test the mysql connection.")
  const [rows] = await connection.query("SELECT 1 AS connected");
  const result = Array.isArray(rows) ? rows[0] : null;

  if (result?.connected === 1) {
    console.log("MySQL connection successful.");
  } else {
    console.log("MySQL connected, but the test query returned an unexpected result.");
    process.exitCode = 1;
  }
} catch (error) {
  console.error("MySQL connection failed.");
  console.error(error);
  process.exitCode = 1;
} finally {
  await connection.end();
}
