export const databaseName = process.env.MYSQL_DATABASE || "leoprofolio";

export function getConnectionOptions({ includeDatabase = true } = {}) {
  const url = process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL) : null;

  if (url) {
    return {
      host: url.hostname,
      port: Number(url.port || 3306),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: includeDatabase
        ? decodeURIComponent(url.pathname.replace(/^\//, "")) || databaseName
        : undefined,
      multipleStatements: false,
    };
  }

  return {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: includeDatabase ? databaseName : undefined,
    multipleStatements: false,
  };
}

export function quoteIdentifier(value) {
  return `\`${String(value).replaceAll("`", "``")}\``;
}
