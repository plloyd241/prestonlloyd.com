import * as http from 'http'
import * as express from 'express'
import * as bodyParser from 'body-parser'

import * as routes from './routes'

const app = express()
const config = {
    port: 3000,
    env: 'development'
}

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.set('view options', { layout: false })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/static'))

/**
 * Routes
 */
app.get('/', routes.index);
app.get('/about/', routes.about);

/**
 * Start
 */
app.listen(config.port, () => {
    console.log('Server listening on port %d', config.port);
});

export var App = app;
