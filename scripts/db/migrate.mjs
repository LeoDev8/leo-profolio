import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import mysql from "mysql2/promise";

import { getConnectionOptions } from "./config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.resolve(__dirname, "../../db/migrations");
const connection = await mysql.createConnection(getConnectionOptions());

try {
  const migrationFiles = (await readdir(migrationsDir))
    .filter((file) => file.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b));

  for (const migrationFile of migrationFiles) {
    const migrationPath = path.join(migrationsDir, migrationFile);
    const sql = await readFile(migrationPath, "utf8");

    await connection.query(sql);
    console.log(`Applied migration: ${migrationFile}`);
  }

  console.log("Migrations complete.");
} finally {
  await connection.end();
}
