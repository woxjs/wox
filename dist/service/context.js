"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var delegates_1 = require("delegates");
var error_1 = require("./error");
var proto = {
    error: function (msg, code) {
        var error;
        if (!(msg instanceof Error)) {
            error = new error_1.default(msg);
            return error.setStatus(code);
        }
        error = new error_1.default(msg.message);
        return error.setStatus(code).setStack(msg.stack);
    }
};
delegates_1.default(proto, 'response')
    .method('redirect')
    .method('replace')
    .method('reload');
delegates_1.default(proto, 'request')
    .access('search')
    .access('method')
    .access('query')
    .access('path')
    .access('url')
    .access('body')
    .access('referer')
    .getter('protocol')
    .getter('host')
    .getter('hostname')
    .getter('secure')
    .getter('isapi')
    .access('referer');
exports.default = proto;
