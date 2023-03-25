import pgp from "pg-promise";

import Connection from "./Connection";

export default class PgPromise implements Connection {
  connection: any;

  constructor() {
    this.connection = pgp()("postgres://default:secret@localhost:5432/branas");
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}
