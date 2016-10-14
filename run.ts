'use strict';

import { Server }  from './server/server';

const app = Server.bootstrap();

app.start();
