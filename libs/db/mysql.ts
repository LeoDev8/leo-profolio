import "server-only";

import mysql, { type Pool } from "mysql2/promise";

type GlobalWithMysql = typeof globalThis & {
  mysqlPool?: Pool;
};

const globalForMysql = globalThis as GlobalWithMysql;

function getDatabaseUrlConfig() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  const url = new URL(process.env.DATABASE_URL);

  return {
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: decodeURIComponent(url.pathname.replace(/^\//, "")),
  };
}

export function isDatabaseConfigured() {
  return Boolean(
    process.env.DATABASE_URL ||
      process.env.MYSQL_HOST ||
      process.env.MYSQL_DATABASE ||
      process.env.MYSQL_USER,
  );
}

export function getMysqlPool() {
  if (globalForMysql.mysqlPool) {
    return globalForMysql.mysqlPool;
  }

  const urlConfig = getDatabaseUrlConfig();

  globalForMysql.mysqlPool = mysql.createPool({
    host: urlConfig?.host ?? process.env.MYSQL_HOST ?? "127.0.0.1",
    port: urlConfig?.port ?? Number(process.env.MYSQL_PORT || 3306),
    user: urlConfig?.user ?? process.env.MYSQL_USER ?? "root",
    password: urlConfig?.password ?? process.env.MYSQL_PASSWORD ?? "",
    database:
      urlConfig?.database ?? process.env.MYSQL_DATABASE ?? "leoprofolio",
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
    namedPlaceholders: true,
  });

  return globalForMysql.mysqlPool;
}
