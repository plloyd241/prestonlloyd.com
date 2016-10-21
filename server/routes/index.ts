'use strict';

import * as express from 'express';

module Controller {

  export class Index {

    public render(req: express.Request, res: express.Response) {
      res.send("<h1>Testing testing 123</h1>");
    }

  }

}

export = Controller;
