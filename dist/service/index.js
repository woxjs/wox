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
var index_1 = require("../history/index");
var context_1 = require("./context");
var request_1 = require("./request");
var response_1 = require("./response");
var compose_1 = require("./compose");
var error_1 = require("./error");
var ApplicationService = /** @class */ (function (_super) {
    __extends(ApplicationService, _super);
    function ApplicationService(configs) {
        if (configs === void 0) { configs = { mode: 'hash', sync: true }; }
        var _this = _super.call(this, configs.mode, configs.sync) || this;
        _this.middleware = [];
        _this.context = Object.create(context_1.default);
        _this.request = Object.create(request_1.default);
        _this.response = Object.create(response_1.default);
        _this.env = process.env.NODE_ENV || 'development';
        _this.contextRequestId = 0;
        return _this;
    }
    ApplicationService.prototype.createApplicationContext = function (req, res) {
        var context = Object.create(this.context);
        var request = context.request = Object.create(this.request);
        var response = context.response = Object.create(this.response);
        context.app = request.app = response.app = this;
        context.req = request.req = response.req = req;
        context.res = request.res = response.res = res;
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        context.body = null;
        context.status = 404;
        context.id = new Date().getTime() + '_' + this.contextRequestId++;
        return context;
    };
    ApplicationService.prototype.handleRequest = function (ctx, fnMiddleware) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fnMiddleware(ctx).then(function () {
                            if (ctx.body !== undefined)
                                ctx.status = 200;
                            if (ctx.status !== 200)
                                return Promise.reject(ctx.error('Not Find Request Path: ' + ctx.path, ctx.status));
                            return ctx.body;
                        }).catch(function (e) { return Promise.resolve(e); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationService.prototype.fetch = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.installed)
                            throw context_1.default.error('No history installed', 502);
                        return [4 /*yield*/, _super.prototype.run.call(this, options)];
                    case 1:
                        result = _a.sent();
                        if (result instanceof error_1.default)
                            throw result;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ApplicationService.prototype.get = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch({ url: url, method: 'GET' })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationService.prototype.post = function (url, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch({ url: url, body: body, method: 'POST' })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationService.prototype.put = function (url, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch({ url: url, body: body, method: 'PUT' })];
            });
        });
    };
    ApplicationService.prototype.delete = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch({ url: url, method: 'DELETE' })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationService.prototype.use = function (fn) {
        this.middleware.push(fn);
        return this;
    };
    ApplicationService.prototype.startServer = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var fn;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fn = compose_1.default(this.middleware);
                        _super.prototype.createServer.call(this, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                            var ctx;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        ctx = this.createApplicationContext(req, res);
                                        return [4 /*yield*/, this.handleRequest(ctx, fn).then(function (data) { return next(data); })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); });
                        this.listener = _super.prototype.listen.call(this);
                        return [4 /*yield*/, _super.prototype.run.call(this, { url: url })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationService.prototype.stopServer = function () {
        if (this.listener) {
            this.listener();
        }
    };
    return ApplicationService;
}(index_1.default));
exports.default = ApplicationService;
