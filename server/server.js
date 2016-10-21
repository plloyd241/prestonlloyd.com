'use strict';
var express = require('express');
var fs = require('fs');
var indexRoute = require('./routes/index');
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        var data = fs.readFileSync('./server/config.json');
        var config = JSON.parse(data);
        this.port = config['port'];
    };
    Server.prototype.routes = function () {
        var router = express.Router();
        var index = new indexRoute.Index();
        router.get('/', index.render.bind(index.render));
        this.app.use(router);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log('App started and listening on port ' + _this.port);
        });
    };
    return Server;
}());
exports.Server = Server;
