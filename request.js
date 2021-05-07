"use strict";

function extend(ClientRequest) {

    ClientRequest.prototype.params = new Object();

    ClientRequest.prototype.setParams = function(data) {
        this.params = data;
    }

}

module.exports = extend;