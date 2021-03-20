"use strict";

let Route = require("./Route");

function Router() {
    this.routes = {};
}

Router.prototype.register = function(method, path, handle) {
    method = method.toUpperCase();
    if (!this.routes[method]) {
        this.routes[method] = [];
    }
    this.routes[method].push(new Route(path, handle));
}

Router.prototype.routeRequest = function(method, path) {
    method = method.toUpperCase();
    if (this.routes[method]) {
        for (let i = 0; i < this.routes[method].length; i++) {
            if (this.routes[method][i].getRoutePath() === path) {
                return this.routes[method][i].getRouteHandle();
            }
        }
    }
    return;
}

module.exports = Router;