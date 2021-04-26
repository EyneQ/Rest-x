"use strict";

let Route = require("./Route");
let methods = require("../lib/http-methods");

function Router() {
    this.root = new Route();
    this._init();
}

Router.prototype._init = function() {
    for (let i = 0; i < methods.length; i++) {
        this.attachMethod(methods[i]);
    }
}

Router.prototype.attachMethod = function(method) {
    this.root.children[method] = {};
    Router.prototype[method.toLowerCase()] = function(path, handler) {
        this._register(
            path.split('/'), handler, this.root.children[method]
        );
    }
}

Router.prototype._lookup = function(method, path, node) {
    path.shift();
    let prefix = path[0];
    if (node === undefined) {
        node = this.root.children[method];
    }

    let found = "";
    for (let key in node) {
        found = node[key]._match(prefix, key, path.length > 1);
        if (found != undefined) {
            break;
        }
    }
    
    if (path.length === 1) {
        return node[found] || undefined;
    }

    return this._lookup(
        method, path, node[found].children
    );
}

Router.prototype._register = function(path, data, node) {
    path.shift();
    if (!path.length) {
        return;
    }

    let prefix = path[0];
    let handler = undefined;
    if (path.length === 1) {
        handler = data;
    }

    if (!node[prefix]) {
        node[prefix] = new Route(handler);
    } else if (handler) {
        node[prefix].data = handler;
    }

    this._register(
        path, data, node[prefix].children
    );
}

module.exports = Router;