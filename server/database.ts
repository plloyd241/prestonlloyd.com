

class Database {
  protected database: string;
  protected username: string;
  protected password: string;
  protected port: number;

  constructor() {}

  private config() {
    this.database = process.env['DB_NAME'];
    this.username = process.env['DB_USER'];
    this.password = process.env['DB_PASS'];
    this.port = process.env['DB_PORT'];
  }
}
