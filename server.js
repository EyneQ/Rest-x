"use strict";

let http = require("http");

function Server() {

    this.server = http.createServer();

}

Server.prototype.listen = function(port) {
    this.server.listen(port);
}

Server.prototype.close = function(callback) {
    this.server.close(callback);
}

module.exports = Server;