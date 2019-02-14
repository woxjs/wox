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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var response_1 = require("./response");
var URL = require("url");
var events_1 = require("events");
var History = /** @class */ (function (_super) {
    __extends(History, _super);
    function History(type, sync) {
        if (type === void 0) { type = 'hash'; }
        if (sync === void 0) { sync = false; }
        var _this = _super.call(this) || this;
        _this.stopRunIt = false;
        _this.installed = false;
        _this.sync = sync;
        _this.name = interface_1.EventListenerName[type];
        if (type === 'html5' && !window.history.pushState) {
            _this.name = interface_1.EventListenerName.hash;
        }
        return _this;
    }
    History.prototype.createContext = function (object) {
        var _this = this;
        var next = function (data) {
            _this.stopRunIt = false;
            return data;
        };
        var req = this.parse(object.url);
        req.body = object.body;
        req.isapi = !!object.url;
        req.method = object.method ? object.method.toUpperCase() : 'GET';
        if (!req.isapi) {
            req.referer = this.referer;
            next = function (data) {
                _this.referer = req.href;
                _this.stopRunIt = false;
                return data;
            };
        }
        return {
            next: next,
            request: req,
            response: new response_1.default(this)
        };
    };
    History.prototype.parse = function (path) {
        switch (this.name) {
            case interface_1.EventListenerName.html5:
                var res = URL.parse(path ? window.location.origin + path
                    : window.location.href, true);
                return res;
            default:
                var location_1 = window.location;
                var hash = path && path.charAt(0) !== '#' ? '#' + path : location_1.hash;
                var obj = URL.parse(hash.length ? hash.substr(1) : '/', true);
                obj.host = location_1.host;
                obj.hostname = location_1.hostname;
                obj.port = location_1.port;
                obj.protocol = location_1.protocol;
                return obj;
        }
    };
    History.prototype.createServer = function (callback) {
        this.handle = callback;
    };
    History.prototype.listen = function () {
        var _this = this;
        var listener = function () {
            if (!_this.stopRunIt) {
                _this.run();
            }
        };
        window.addEventListener(this.name, listener);
        this.installed = true;
        return function () { return window.removeEventListener(_this.name, listener); };
    };
    History.prototype.run = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, request, response, next;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.createContext(object), request = _a.request, response = _a.response, next = _a.next;
                        return [4 /*yield*/, this.handle(request, response, next)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    History.prototype.redirect = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.name;
                        switch (_a) {
                            case interface_1.EventListenerName.html5: return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        if (!this.sync) return [3 /*break*/, 3];
                        this.stopRunIt = true;
                        return [4 /*yield*/, this.run({ url: url })];
                    case 2:
                        _b.sent();
                        window.history.pushState({}, window.document.title, url);
                        return [3 /*break*/, 5];
                    case 3:
                        window.history.pushState({}, window.document.title, url);
                        return [4 /*yield*/, this.reload()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [3 /*break*/, 10];
                    case 6:
                        if (!this.sync) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.run({ url: url })];
                    case 7:
                        _b.sent();
                        window.location.hash = url;
                        return [3 /*break*/, 10];
                    case 8:
                        window.location.hash = url;
                        return [4 /*yield*/, this.reload()];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    History.prototype.replace = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.name;
                        switch (_a) {
                            case interface_1.EventListenerName.html5: return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        if (!this.sync) return [3 /*break*/, 3];
                        this.stopRunIt = true;
                        return [4 /*yield*/, this.run({ url: url })];
                    case 2:
                        _b.sent();
                        window.history.replaceState({}, window.document.title, url);
                        return [3 /*break*/, 5];
                    case 3:
                        window.history.replaceState({}, window.document.title, url);
                        return [4 /*yield*/, this.reload()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [3 /*break*/, 10];
                    case 6:
                        if (!this.sync) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.run({ url: url })];
                    case 7:
                        _b.sent();
                        replaceUriWithHash(url);
                        return [3 /*break*/, 10];
                    case 8:
                        replaceUriWithHash(url);
                        return [4 /*yield*/, this.reload()];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    History.prototype.reload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.run()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return History;
}(events_1.EventEmitter));
exports.default = History;
function replaceUriWithHash(url) {
    var i = window.location.href.indexOf('#');
    window.location.replace(window.location.href.slice(0, i >= 0 ? i : 0) + '#' + url);
}
