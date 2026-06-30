export const databaseName = process.env.MYSQL_DATABASE;

export function getConnectionOptions({ includeDatabase = true } = {}) {

  return {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: decodeURIComponent(process.env.MYSQL_USER),
    password: process.env.MYSQL_PASSWORD,
    database: includeDatabase
      ? databaseName
      : undefined,
    multipleStatements: false,
  };
}

export function quoteIdentifier(value) {
  return `\`${String(value).replaceAll("`", "``")}\``;
}
