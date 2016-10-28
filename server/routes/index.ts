'use strict';

import * as express from 'express';

module Route {

  export class Index {
    public render(req: express.Request, res: express.Response) {
      res.render('index');
    }
  }

}

export = Route;
