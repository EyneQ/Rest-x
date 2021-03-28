"use strict";

let Route = require("./Route");
let methods = require("../lib/http-methods");

function Node(handler) {
    this.children = {};
    this.data = null;
}

function Router() {
    this.root = new Node();
    this._init(this.root);
}

Router.prototype._init = function(root) {
    for (let i = 0; i < methods.length; i++) {
        root.children[methods[i]] = {
            node: new Node() 
        };
    }
}

Router.prototype._register = function() {

}

Router.prototype._route = function() {

}

module.exports = Router;