'use strict';
var express = require('express');
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () { };
    Server.prototype.start = function () { };
    return Server;
}());
exports.Server = Server;
