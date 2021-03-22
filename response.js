"use strict";

let fs = require("fs");

function extend(ServerResponse) {

    ServerResponse.prototype.statusCode = function(code) {
        this.statusCode = code;
        return this;
    }

    ServerResponse.prototype.json = function(json) {
        this.setHeader("Content-Type", "application/json");
        return this.send(JSON.stringify(json));
    }

    ServerResponse.prototype.send = function(data) {
        return this.end(data);
    }

    ServerResponse.prototype.sendFile = function(path, callback) {
        fs.readFile(path, function (error, data) {
            if (error) {
                this.statusCode(404);
                callback(error);
                return;
            }
            return this.send(data);       
        });
    }
}

module.exports = extend;