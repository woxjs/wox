"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WoxRunTimeError = /** @class */ (function (_super) {
    __extends(WoxRunTimeError, _super);
    function WoxRunTimeError() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.name = 'WoxRuntimeError';
        return _this;
    }
    WoxRunTimeError.prototype.setStatus = function (value) {
        this.status = value;
        this.code = value;
        return this;
    };
    WoxRunTimeError.prototype.setStack = function (stack) {
        this.stack = stack;
        return this;
    };
    return WoxRunTimeError;
}(Error));
exports.default = WoxRunTimeError;
