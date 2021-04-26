function Route(data) {
    this.handler = data;
    this.children = {};
}

Route.prototype._match = function(path, prefix, hasMore) {
    if (path === prefix) {
        return prefix;
    }
    
    if (prefix != "" && prefix != '*') {
        compiled = new RegExp(prefix);
        if (compiled.test(path)) {
            return prefix;
        }
    }

    if (hasMore) {
        if ((prefix[0] === ':' || prefix[0] === '*') && Object.keys(this.children).length > 0) {
            return prefix;
        }
    } else {
        if ((prefix[0] === ':' || prefix[0] === '*') && !Object.keys(this.children).length) {
            return prefix;
        }
    }


    return undefined;
}

module.exports = Route;