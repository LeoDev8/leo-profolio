declare module "mysql2/promise" {
  export type RowDataPacket = Record<string, unknown>;

  export type Pool = {
    query<T = unknown>(sql: string, values?: unknown): Promise<[T, unknown]>;
  };

  export type Connection = {
    query<T = unknown>(sql: string, values?: unknown): Promise<[T, unknown]>;
    execute<T = unknown>(sql: string, values?: unknown): Promise<[T, unknown]>;
    end(): Promise<void>;
  };

  export function createPool(options: Record<string, unknown>): Pool;
  export function createConnection(
    options: Record<string, unknown>,
  ): Promise<Connection>;

  const mysql: {
    createPool: typeof createPool;
    createConnection: typeof createConnection;
  };

  export default mysql;
}
