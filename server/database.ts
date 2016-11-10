import * as pgp from 'pg-promise';

interface DatabaseConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
}

class Database {
  protected config: DatabaseConfig;

  constructor() {
    this.initConfig();
  }

  private initConfig() {
    this.config = {
      database: process.env['POSTGRES_DB'],
      username: process.env['POSTGRES_USER'],
      password: process.env['POSTGRES_PASSWORD'],
      host: process.env['POSTGRES_HOST'],
      port: process.env['POSTGRES_PORT']
    }
  }
}
