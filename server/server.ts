'use strict';

// Import
import * as bodyParser from 'body-parser';
import * as express from 'express';

export class Server {

  public app: express.Application;
  private port: number;

  constructor() {
    this.app = express();

    this.config();
  }

  public static bootstrap(): Server {
    return new Server();
  }

  private config(): void {}

  public start(): void {}

}
