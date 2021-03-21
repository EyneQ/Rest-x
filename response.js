function extend(ServerResponse) {

    ServerResponse.prototype.statusCode = function(code) {
        this.statusCode = code;
        return this;
    }

    ServerResponse.prototype.json = function(json) {
        this.setHeader("Content-Type", "application/json");
        this.write(JSON.stringify(json));
        this.end();
        return this;
    }

}

module.exports = extend;