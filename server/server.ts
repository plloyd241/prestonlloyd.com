'use strict';

// Import
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';

import * as indexRoute from './routes/index';

export class Server {

  public app: express.Application;
  private port: number;

  constructor() {
    this.app = express();

    this.config();
    this.routes();
  }

  public static bootstrap(): Server {
    return new Server();
  }

  private config(): void {
    this.port = process.env['APP_PORT'];

    this.app.set('views', __dirname + '/views');
    this.app.set('view engine', 'pug');
  }

  private routes(): void {
    let router = express.Router();

    let index = new indexRoute.Index();

    router.get('/', index.render.bind(index.render));

    this.app.use(router);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log('App started and listening on port ' + this.port);
    });
  }

}
