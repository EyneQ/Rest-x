function Route(data) {
    this.data = data;
    this.children = {};
}

Route.prototype._match = function(path, prefix) {
    let compiled = new RegExp(prefix);
    if (path === prefix) {
        return prefix;
    }

    if (compiled.test(path)) {
        return prefix;
    }

    if (prefix[0] === ':') {
        return prefix;
    }

    return undefined;
}

module.exports = Route;