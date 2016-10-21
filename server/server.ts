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
    let data: any = fs.readFileSync('./server/config.json');
    let config = JSON.parse(data);

    this.port = config['port'];
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
