"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("./error");
function compose(middleware) {
    return function (context, next) {
        var index = -1;
        return dispatch(0);
        function dispatch(i) {
            if (i <= index)
                return Promise.reject(new error_1.default('[compose] next() called multiple times'));
            index = i;
            var fn = middleware[i];
            if (i === middleware.length)
                fn = next;
            if (!fn)
                return Promise.resolve();
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
    };
}
exports.default = compose;
