import mysql from "mysql2/promise";

import { databaseName, getConnectionOptions, quoteIdentifier } from "./config.mjs";

const connection = await mysql.createConnection(
  getConnectionOptions({ includeDatabase: false }),
);

try {
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${quoteIdentifier(databaseName)} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  );
  console.log(`Database ready: ${databaseName}`);
} finally {
  await connection.end();
}
