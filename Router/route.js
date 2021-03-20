"use strict";

function Route(path, handle) {
    this.path = path;
    this.handle = handle;
}

Route.prototype.getRoutePath = function() {
    return this.path;
}

Route.prototype.getRouteHandle = function() {
    return this.handle;
}

module.exports = Route;