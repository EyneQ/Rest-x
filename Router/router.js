"use strict";

let Route = require("./Route");
let methods = require("../lib/http-methods");

function Node(data) {
    this.data = data;
    this.children = {};
}

function Router() {
    this.root = new Node();
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
        this._register(path.split("/"), handler, this.root.children[method]);
    }
}

Router.prototype._lookup = function(method, path, node) {
    path.shift();
    if (node === undefined) {
        node = this.root.children[method];
    }
    if (!(path.length - 1)) {
        if (node[path[0]]) {
            return node[path[0]].data;
        } else {
            return undefined;
        }
    } else {
        return this._lookup(method, path, node[path[0]].children);
    }

}

Router.prototype._register = function(path, data, node) {
    path.shift();
    let prefix = path[0];

    if (path.length) {

        let handler = undefined;
        if (path.length == 1) {
            handler = data;
        }

        if (!node[prefix]) {
            node[prefix] = new Node(handler);
        } else if (handler) {
            node[prefix].data = handler;
        }

        this._register(path, data, node[prefix].children);
    }
}

Router.prototype._remove = function(method, path, node) {

}

module.exports = Router;