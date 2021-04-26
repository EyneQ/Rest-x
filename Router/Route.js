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

    if (prefix.charCodeAt(0) == 42 || prefix.charCodeAt(0) == 58) {
        if (hasMore && Object.keys(this.children).length) {
            return prefix;
        } else if (!hasMore) {
            return prefix;
        }
    }

    return undefined;
}

module.exports = Route;