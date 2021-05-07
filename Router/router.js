"use strict";

const F_SLASH = '/';
let methods = require("../lib/http-methods");

function Route(prefix, data) {
    this.handler = data;
    this.children = {};
    this.process(prefix);
}

Route.prototype.process = function(prefix) {
    if (prefix) {
        if (prefix.charCodeAt(0) == 58 || prefix.charCodeAt(0) == 42) {
            this.dynamic = true;
            return;
        }
    
        if (prefix instanceof RegExp) {
            this.regexp = new RegExp(prefix.replace("*", ".*"), "g");
        }
    }
}

function Router() {
    this.routes = new Route();
    this.init();
}

Router.prototype.init = function() {
    for (let i = 0; i < methods.length; i++) {
        this.attach(methods[i].toLowerCase());
    }
}

Router.prototype.attach = function(method) {
    Router.prototype[method] = function(path, handler) {
        this.register(method + path, handler, this.routes);
    }
}

Router.prototype.register = function(path, handler, node, index) {
    let nextIndex = path.indexOf(F_SLASH, index);
    let prefix = path.substr(index, (nextIndex + 1 || path.length) - 1);
    if (!node.children[prefix]) {
        node.children[prefix] = new Route(prefix);
        if (nextIndex == -1) {
            node.children[prefix].handler = handler;
            return;
        }
    }

    this.register(
        path, handler, node.children[prefix], nextIndex + 1
    );
}

Router.prototype.lookup = function(path, node, index) {
}

module.exports = Router;