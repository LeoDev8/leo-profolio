import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import mysql from "mysql2/promise";

import { getConnectionOptions } from "./config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationPath = path.resolve(
  __dirname,
  "../../db/migrations/001_create_photo_works.sql",
);
const sql = await readFile(migrationPath, "utf8");
const connection = await mysql.createConnection(getConnectionOptions());

try {
  await connection.query(sql);
  console.log("Migrations complete.");
} finally {
  await connection.end();
}
