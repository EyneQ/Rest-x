"use strict";

let http = require("http");
let Router = require("./Router/router");
let extendResponse = require("./response");
let extendRequest = require("./request")

extendResponse(http.ServerResponse);
extendRequest(http.IncomingMessage);

function Server() {

    this.router = new Router();
    this.server = http.createServer();

    this.server.on("request", this.request.bind(this));
}

Server.prototype.listen = function(port) {
    this.server.listen(port);
}

Server.prototype.close = function(callback) {
    this.server.close(callback);
}

Server.prototype.request = function(request, response) {
    let requestHandler =
        this.router.lookup(request.method, request.url);

    /*if (requestHandler !== undefined) {
        request.setParams(requestHandler.params);
        requestHandler.handler(request, response);
    }*/
}

module.exports = Server;