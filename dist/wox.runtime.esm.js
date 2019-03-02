/*!
 * Wox.js v2.1.2
 * (c) 2018-2019 Evio Shen
 * Released under the MIT License.
 */
import Vue from 'vue';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect$1;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof global === "object" ? global :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    { previous(key, value); }
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    { throw new TypeError(); }
                if (!IsObject(target))
                    { throw new TypeError(); }
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    { throw new TypeError(); }
                if (IsNull(attributes))
                    { attributes = undefined; }
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    { throw new TypeError(); }
                if (!IsConstructor(target))
                    { throw new TypeError(); }
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    { throw new TypeError(); }
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    { throw new TypeError(); }
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                { throw new TypeError(); }
            if (!IsUndefined(propertyKey))
                { propertyKey = ToPropertyKey(propertyKey); }
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                { throw new TypeError(); }
            if (!IsUndefined(propertyKey))
                { propertyKey = ToPropertyKey(propertyKey); }
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                { throw new TypeError(); }
            if (!IsUndefined(propertyKey))
                { propertyKey = ToPropertyKey(propertyKey); }
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                { throw new TypeError(); }
            if (!IsUndefined(propertyKey))
                { propertyKey = ToPropertyKey(propertyKey); }
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                { throw new TypeError(); }
            if (!IsUndefined(propertyKey))
                { propertyKey = ToPropertyKey(propertyKey); }
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                { throw new TypeError(); }
            if (!IsUndefined(propertyKey))
                { propertyKey = ToPropertyKey(propertyKey); }
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                { throw new TypeError(); }
            if (!IsUndefined(propertyKey))
                { propertyKey = ToPropertyKey(propertyKey); }
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                { throw new TypeError(); }
            if (!IsUndefined(propertyKey))
                { propertyKey = ToPropertyKey(propertyKey); }
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                { return false; }
            if (!metadataMap.delete(metadataKey))
                { return false; }
            if (metadataMap.size > 0)
                { return true; }
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                { return true; }
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        { throw new TypeError(); }
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        { throw new TypeError(); }
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    { return undefined; }
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    { return undefined; }
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                { return true; }
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                { return OrdinaryHasMetadata(MetadataKey, parent, P); }
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                { return false; }
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                { return OrdinaryGetOwnMetadata(MetadataKey, O, P); }
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                { return OrdinaryGetMetadata(MetadataKey, parent, P); }
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                { return undefined; }
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                { return ownKeys; }
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                { return ownKeys; }
            if (ownKeys.length <= 0)
                { return parentKeys; }
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                { return keys; }
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                { return 1 /* Null */; }
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    { throw new TypeError(); }
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        { return result; }
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        { return result; }
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        { return result; }
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        { return result; }
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                { return key; }
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                { return undefined; }
            if (!IsCallable(func))
                { throw new TypeError(); }
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                { throw new TypeError(); } // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                { throw new TypeError(); }
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                { f.call(iterator); }
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                { return proto; }
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                { return proto; }
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                { return proto; }
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                { return proto; }
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                { return proto; }
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = /** @class */ (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return /** @class */ (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return /** @class */ (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return /** @class */ (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    { key = "@@WeakMap@@" + CreateUUID(); }
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        { return undefined; }
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    { buffer[i] = Math.random() * 0xff | 0; }
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        { return crypto.getRandomValues(new Uint8Array(size)); }
                    if (typeof msCrypto !== "undefined")
                        { return msCrypto.getRandomValues(new Uint8Array(size)); }
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        { result += "-"; }
                    if (byte < 16)
                        { result += "0"; }
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect$1 || (Reflect$1 = {}));

var Methods = ['Get', 'Post', 'Put', 'Delete'];

var Http = {};
var Interface = {};
Methods.forEach(function (method) {
  Http[method] = function (path, key, desc) {
    if (typeof path === 'string') {
      return function (target, propertyKey, descriptor) {
        var HttpMetaData = Reflect.getMetadata('Http', descriptor.value);
        if (!HttpMetaData) { HttpMetaData = []; }
        HttpMetaData.unshift({
          method: method,
          prefix: path
        });
        Reflect.defineMetadata('Http', HttpMetaData, descriptor.value);
      };
    } else {
      var HttpMetaData = Reflect.getMetadata('Http', desc.value);
      if (!HttpMetaData) { HttpMetaData = []; }
      HttpMetaData.unshift({
        method: method,
        prefix: '(/?)'
      });
      Reflect.defineMetadata('Http', HttpMetaData, desc.value);
    }
  };
});
function Controller(prefix) {
  if (typeof prefix === 'function') {
    Reflect.defineMetadata('Controller', '/', prefix);
    return Reflect.defineMetadata('Index', 99, prefix);
  }

  return function (target) {
    return Reflect.defineMetadata('Controller', prefix, target);
  };
}
function Index(i) {
  return function (target, propertyKey, descriptor) {
    if (!propertyKey && !descriptor) {
      return Reflect.defineMetadata('Index', i, target);
    }
  };
}
function Middleware() {
  var arguments$1 = arguments;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments$1[_key];
  }

  return function (target, propertyKey, descriptor) {
    if (!propertyKey && !descriptor) {
      var _parentMiddlewares;

      var parentMiddlewares = Reflect.getMetadata('Middleware', target);
      if (!parentMiddlewares) { parentMiddlewares = []; }

      (_parentMiddlewares = parentMiddlewares).unshift.apply(_parentMiddlewares, args);

      Reflect.defineMetadata('Middleware', parentMiddlewares, target);
    } else {
      var _childMiddlewares;

      var childMiddlewares = Reflect.getMetadata('Middleware', target);
      if (!childMiddlewares) { childMiddlewares = []; }

      (_childMiddlewares = childMiddlewares).unshift.apply(_childMiddlewares, args);

      Reflect.defineMetadata('Middleware', childMiddlewares, descriptor.value);
    }
  };
}
function Param(id) {
  var arguments$1 = arguments;

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments$1[_key2];
  }

  return function (target, propertyKey, descriptor) {
    if (!propertyKey && !descriptor) {
      var Params = Reflect.getMetadata('Param', target);
      if (!Params) { Params = []; }
      Params.push({
        id: id,
        middlewares: args
      });
      Reflect.defineMetadata('Param', Params, target);
    }
  };
}

var EventEmitter =
/*#__PURE__*/
function () {
  _createClass(EventEmitter, null, [{
    key: "Methods",
    get: function get() {
      return ['on', 'off', 'addListener', 'removeListener', 'prependListener', 'removeAllListeners', 'emit', 'eventNames', 'listenerCount', 'listeners'];
    }
  }]);

  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this._eventStacks = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(name, listener) {
      this.addListener(name, listener);
    }
  }, {
    key: "off",
    value: function off(name, listener) {
      this.removeListener(name, listener);
    }
  }, {
    key: "addListener",
    value: function addListener(name, listener) {
      if (!this._eventStacks[name]) {
        this._eventStacks[name] = [];
      }

      this._eventStacks[name].push(listener);
    }
  }, {
    key: "removeListener",
    value: function removeListener(name, listener) {
      var listeners = this.listeners(name);
      var index = listeners.indexOf(listener);

      if (index > -1) {
        listeners.splice(index, 1);

        if (this.listenerCount(name) === 0) {
          this.removeAllListeners(name);
        }
      }
    }
  }, {
    key: "prependListener",
    value: function prependListener(name, listener) {
      if (!this._eventStacks[name]) {
        this._eventStacks[name] = [];
      }

      this._eventStacks[name].unshift(listener);
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners(name) {
      if (this._eventStacks[name]) {
        delete this._eventStacks[name];
      }
    }
  }, {
    key: "emit",
    value: function () {
      var _emit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(name) {
        var listeners,
            _len,
            args,
            _key,
            i,
            listener,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                listeners = this.listeners(name);

                if (listeners) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                for (_len = _args.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = _args[_key];
                }

                i = 0;

              case 5:
                if (!(i < listeners.length)) {
                  _context.next = 12;
                  break;
                }

                listener = listeners[i];
                _context.next = 9;
                return listener.apply(void 0, args);

              case 9:
                i++;
                _context.next = 5;
                break;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function emit(_x) {
        return _emit.apply(this, arguments);
      }

      return emit;
    }()
  }, {
    key: "eventNames",
    value: function eventNames() {
      return Object.keys(this._eventStacks);
    }
  }, {
    key: "listenerCount",
    value: function listenerCount(name) {
      var listeners = this.listeners(name);
      return listeners ? listeners.length : 0;
    }
  }, {
    key: "listeners",
    value: function listeners(name) {
      return this._eventStacks[name];
    }
  }]);

  return EventEmitter;
}();

var util = {
  isString: function isString(arg) {
    return typeof arg === 'string';
  },
  isObject: function isObject(arg) {
    return _typeof(arg) === 'object' && arg !== null;
  },
  isNull: function isNull(arg) {
    return arg === null;
  },
  isNullOrUndefined: function isNullOrUndefined(arg) {
    return arg == null;
  }
};

// Copyright Joyent, Inc. and other Node contributors.
var parse = urlParse;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
} // Reference: RFC 3986, RFC 1808, RFC 2396
// define these here so at least they only have to be
// compiled once on the first module load.


var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,
    // Special case for a simple path URL
simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
    // RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
    // RFC 2396: characters not allowed for various reasons.
unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
unsafeProtocol = {
  'javascript': true,
  'javascript:': true
},
    // protocols that never have a hostname.
hostlessProtocol = {
  'javascript': true,
  'javascript:': true
},
    // protocols that always contain a // bit.
slashedProtocol = {
  'http': true,
  'https': true,
  'ftp': true,
  'gopher': true,
  'file': true,
  'http:': true,
  'https:': true,
  'ftp:': true,
  'gopher:': true,
  'file:': true
},
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) { return url; }
  var u = new Url();
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + _typeof(url));
  } // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916


  var queryIndex = url.indexOf('?'),
      splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);
  var rest = url; // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"

  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);

    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];

      if (simplePath[2]) {
        this.search = simplePath[2];

        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }

      return this;
    }
  }

  var proto = protocolPattern.exec(rest);

  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  } // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.


  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';

    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c
    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.
    // find the first instance of any hostEndingChars
    var hostEnd = -1;

    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) { hostEnd = hec; }
    } // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.


    var auth, atSign;

    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    } // Now we have a portion which is definitely the auth.
    // Pull that off.


    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    } // the host is the remaining to the left of the first non-host char


    hostEnd = -1;

    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) { hostEnd = hec; }
    } // if we still have not hit it, then the entire thing is a host.


    if (hostEnd === -1) { hostEnd = rest.length; }
    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd); // pull out port.

    this.parseHost(); // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.

    this.hostname = this.hostname || ''; // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.

    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']'; // validate a little.

    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);

      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) { continue; }

        if (!part.match(hostnamePartPattern)) {
          var newpart = '';

          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          } // we test again with ASCII char only


          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);

            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }

            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }

            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host; // strip [ and ] from the hostname
    // the host field still retains them, though

    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);

      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  } // now rest is set to the post-host stuff.
  // chop off any delim chars.


  if (!unsafeProtocol[lowerProto]) {
    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1) { continue; }
      var esc = encodeURIComponent(ae);

      if (esc === ae) {
        esc = escape(ae);
      }

      rest = rest.split(ae).join(esc);
    }
  } // chop off from the tail first.


  var hash = rest.indexOf('#');

  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }

  var qm = rest.indexOf('?');

  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);

    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }

    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }

  if (rest) { this.pathname = rest; }

  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
    this.pathname = '/';
  } //to support http.request


  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  } // finally, reconstruct the href based on what has been validated.


  this.href = this.format();
  return this;
}; // format a parsed object into a url string

Url.prototype.format = function () {
  var auth = this.auth || '';

  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');

    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || query && '?' + query || '';
  if (protocol && protocol.substr(-1) !== ':') { protocol += ':'; } // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.

  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') { pathname = '/' + pathname; }
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') { hash = '#' + hash; }
  if (search && search.charAt(0) !== '?') { search = '?' + search; }
  pathname = pathname.replace(/[?#]/g, function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');
  return protocol + host + pathname + search + hash;
};

Url.prototype.resolve = function (relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

Url.prototype.resolveObject = function (relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);

  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  } // hash is always overridden, no matter what.
  // even href="" will remove it.


  result.hash = relative.hash; // if the relative url is empty, then there's nothing left to do here.

  if (relative.href === '') {
    result.href = result.format();
    return result;
  } // hrefs like //foo/bar always cut to the protocol.


  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);

    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol') { result[rkey] = relative[rkey]; }
    } //urlParse appends trailing / to urls like http://www.example.com


    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);

      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }

      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;

    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');

      while (relPath.length && !(relative.host = relPath.shift())) {
      }

      if (!relative.host) { relative.host = ''; }
      if (!relative.hostname) { relative.hostname = ''; }
      if (relPath[0] !== '') { relPath.unshift(''); }
      if (relPath.length < 2) { relPath.unshift(''); }
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }

    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port; // to support http.request

    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }

    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
      isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
      mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol]; // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.

  if (psychotic) {
    result.hostname = '';
    result.port = null;

    if (result.host) {
      if (srcPath[0] === '') { srcPath[0] = result.host; }else { srcPath.unshift(result.host); }
    }

    result.host = '';

    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;

      if (relative.host) {
        if (relPath[0] === '') { relPath[0] = relative.host; }else { relPath.unshift(relative.host); }
      }

      relative.host = null;
    }

    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = relative.host || relative.host === '' ? relative.host : result.host;
    result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath; // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) { srcPath = []; }
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift(); //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')

      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;

      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    result.search = relative.search;
    result.query = relative.query; //to support http.request

    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
    }

    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null; //to support http.request

    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }

    result.href = result.format();
    return result;
  } // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.


  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === ''; // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0

  var up = 0;

  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];

    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  } // if the path is allowed to go above the root, restore leading ..s


  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/'; // put the host back

  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : ''; //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')

    var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;

    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || result.host && srcPath.length;

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  } //to support request.http


  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
  }

  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function () {
  var host = this.host;
  var port = portPattern.exec(host);

  if (port) {
    port = port[0];

    if (port !== ':') {
      this.port = port.substr(1);
    }

    host = host.substr(0, host.length - port.length);
  }

  if (host) { this.hostname = host; }
};

var Response =
/*#__PURE__*/
function () {
  function Response(history) {
    _classCallCheck(this, Response);

    this.history = history;
  }

  _createClass(Response, [{
    key: "redirect",
    value: function () {
      var _redirect = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this$history;

        var _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (_this$history = this.history).redirect.apply(_this$history, _args);

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function redirect() {
        return _redirect.apply(this, arguments);
      }

      return redirect;
    }()
  }, {
    key: "replace",
    value: function () {
      var _replace = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this$history2;

        var _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (_this$history2 = this.history).replace.apply(_this$history2, _args2);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function replace() {
        return _replace.apply(this, arguments);
      }

      return replace;
    }()
  }, {
    key: "reload",
    value: function () {
      var _reload = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.history.reload();

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function reload() {
        return _reload.apply(this, arguments);
      }

      return reload;
    }()
  }]);

  return Response;
}();

var EventListenerName = {
  hash: 'hashchange',
  html5: 'popstate'
};

var History =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(History, _EventEmitter);

  function History(type) {
    var _this;

    _classCallCheck(this, History);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(History).call(this));
    _this.history_installed = false;
    _this.history_process_listener = null;
    _this.history_stop_run_process = false;
    _this.history_event_name = EventListenerName[type] || 'hashChange';

    if (type === 'html5' && !window.history.pushState) {
      _this.history_event_name = EventListenerName.hash;
    }

    return _this;
  }

  _createClass(History, [{
    key: "history_create_context",
    value: function history_create_context() {
      var _this2 = this;

      var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var next = function next(err, data) {
        _this2.history_stop_run_process = false;
        return data;
      };

      var req = this.history_parse(object.url);
      req.body = object.body;
      req.isapi = !!object.url;
      req.method = object.method ? object.method.toUpperCase() : 'GET';

      if (!req.isapi) {
        req.referer = this.history_referer;

        next = function next(err, data) {
          if (!err) {
            _this2.history_referer = req.href;
          }

          _this2.history_stop_run_process = false;
          return data;
        };
      }

      return {
        next: next,
        request: req,
        response: new Response(this)
      };
    }
  }, {
    key: "history_parse",
    value: function history_parse(path) {
      switch (this.history_event_name) {
        case EventListenerName.html5:
          return parse(path ? window.location.origin + path : window.location.href, true);

        default:
          var location = window.location;
          var hash = path && path.charAt(0) !== '#' ? '#' + path : location.hash;
          var obj = parse(hash.length ? hash.substr(1) : '/', true);
          obj.host = location.host;
          obj.hostname = location.hostname;
          obj.port = location.port;
          obj.protocol = location.protocol;
          return obj;
      }
    }
  }, {
    key: "history_create_server",
    value: function history_create_server(callback) {
      this.history_process_listener = callback;
    }
  }, {
    key: "history_listen",
    value: function history_listen() {
      var _this3 = this;

      var listener = function listener() {
        if (!_this3.history_stop_run_process) {
          _this3.history_run_process();
        }
      };

      window.addEventListener(this.history_event_name, listener);
      this.history_installed = true;
      return function () {
        return window.removeEventListener(_this3.history_event_name, listener);
      };
    }
  }, {
    key: "history_run_process",
    value: function () {
      var _history_run_process = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(object) {
        var _this$history_create_, request, response, next;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$history_create_ = this.history_create_context(object), request = _this$history_create_.request, response = _this$history_create_.response, next = _this$history_create_.next;
                _context.next = 3;
                return this.history_process_listener(request, response, next);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function history_run_process(_x) {
        return _history_run_process.apply(this, arguments);
      }

      return history_run_process;
    }()
  }, {
    key: "redirect",
    value: function () {
      var _redirect = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(url, sync) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = this.history_event_name;
                _context2.next = _context2.t0 === EventListenerName.html5 ? 3 : 16;
                break;

              case 3:
                if (!sync) {
                  _context2.next = 11;
                  break;
                }

                this.history_stop_run_process = true;
                _context2.next = 7;
                return this.history_run_process({
                  url: url
                });

              case 7:
                result = _context2.sent;
                window.history.pushState({}, window.document.title, url);
                _context2.next = 15;
                break;

              case 11:
                window.history.pushState({}, window.document.title, url);
                _context2.next = 14;
                return this.reload();

              case 14:
                result = _context2.sent;

              case 15:
                return _context2.abrupt("break", 27);

              case 16:
                if (!sync) {
                  _context2.next = 23;
                  break;
                }

                _context2.next = 19;
                return this.history_run_process({
                  url: url
                });

              case 19:
                result = _context2.sent;
                window.location.hash = url;
                _context2.next = 27;
                break;

              case 23:
                window.location.hash = url;
                _context2.next = 26;
                return this.reload();

              case 26:
                result = _context2.sent;

              case 27:
                return _context2.abrupt("return", result);

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function redirect(_x2, _x3) {
        return _redirect.apply(this, arguments);
      }

      return redirect;
    }()
  }, {
    key: "replace",
    value: function () {
      var _replace = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(url, sync) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = this.history_event_name;
                _context3.next = _context3.t0 === EventListenerName.html5 ? 3 : 16;
                break;

              case 3:
                if (!sync) {
                  _context3.next = 11;
                  break;
                }

                this.history_stop_run_process = true;
                _context3.next = 7;
                return this.history_run_process({
                  url: url
                });

              case 7:
                result = _context3.sent;
                window.history.replaceState({}, window.document.title, url);
                _context3.next = 15;
                break;

              case 11:
                window.history.replaceState({}, window.document.title, url);
                _context3.next = 14;
                return this.reload();

              case 14:
                result = _context3.sent;

              case 15:
                return _context3.abrupt("break", 27);

              case 16:
                if (!sync) {
                  _context3.next = 23;
                  break;
                }

                _context3.next = 19;
                return this.history_run_process({
                  url: url
                });

              case 19:
                result = _context3.sent;
                replaceUriWithHash(url);
                _context3.next = 27;
                break;

              case 23:
                replaceUriWithHash(url);
                _context3.next = 26;
                return this.reload();

              case 26:
                result = _context3.sent;

              case 27:
                return _context3.abrupt("return", result);

              case 28:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function replace(_x4, _x5) {
        return _replace.apply(this, arguments);
      }

      return replace;
    }()
  }, {
    key: "reload",
    value: function () {
      var _reload = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.history_run_process();

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function reload() {
        return _reload.apply(this, arguments);
      }

      return reload;
    }()
  }, {
    key: "history_url_render",
    value: function history_url_render(url) {
      if (!url) { return; }
      this.history_stop_run_process = true;

      switch (this.history_event_name) {
        case EventListenerName.html5:
          window.history.replaceState({}, window.document.title, url);
          break;

        default:
          replaceUriWithHash(url);
      }
    }
  }]);

  return History;
}(EventEmitter);

function replaceUriWithHash(url) {
  var i = window.location.href.indexOf('#');
  window.location.replace(window.location.href.slice(0, i >= 0 ? i : 0) + '#' + url);
}

/**
 * Expose `Delegator`.
 */
/**
 * Initialize a delegator.
 *
 * @param {Object} proto
 * @param {String} target
 * @api public
 */

function Delegator(proto, target) {
  if (!(this instanceof Delegator)) { return new Delegator(proto, target); }
  this.proto = proto;
  this.target = target;
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}
/**
 * Delegate method `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */


Delegator.prototype.method = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.methods.push(name);

  proto[name] = function () {
    return this[target][name].apply(this[target], arguments);
  };

  return this;
};
/**
 * Delegator accessor `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */


Delegator.prototype.access = function (name) {
  return this.getter(name).setter(name);
};
/**
 * Delegator getter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */


Delegator.prototype.getter = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.getters.push(name);

  proto.__defineGetter__(name, function () {
    return this[target][name];
  });

  return this;
};
/**
 * Delegator setter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */


Delegator.prototype.setter = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.setters.push(name);

  proto.__defineSetter__(name, function (val) {
    return this[target][name] = val;
  });

  return this;
};
/**
 * Delegator fluent accessor
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */


Delegator.prototype.fluent = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.fluents.push(name);

  proto[name] = function (val) {
    if ('undefined' != typeof val) {
      this[target][name] = val;
      return this;
    } else {
      return this[target][name];
    }
  };

  return this;
};

var WoxError =
/*#__PURE__*/
function (_Error) {
  _inherits(WoxError, _Error);

  function WoxError(msg, code) {
    var _this;

    _classCallCheck(this, WoxError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WoxError).call(this, '[Wox Error]: ' + msg));
    _this.status = code || 500;
    _this.code = code || 500;
    return _this;
  }

  return WoxError;
}(_wrapNativeSuper(Error));

var proto = {
  error: function error(msg) {
    var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    return new WoxError(msg instanceof Error ? msg.message : msg, code);
  },
  render: function render(webview, props) {
    this.status = 200;
    return this.app.render(webview, props);
  }
};
var response = new Delegator(proto, 'response');
var request = new Delegator(proto, 'request');
response.method('redirect').method('replace').method('reload').method('fetch').method('get').method('post').method('put').method('delete');
request.access('search').access('method').access('query').access('path').access('url').access('body').access('referer').getter('protocol').getter('host').getter('hostname').getter('secure').getter('isapi').access('referer');

var RequestConstructor = {
  get url() {
    return this.req.href;
  },

  get method() {
    return this.req.method || 'GET';
  },

  get path() {
    return this.req.pathname;
  },

  get query() {
    return this.req.query;
  },

  get search() {
    return this.req.search;
  },

  get host() {
    return this.req.host;
  },

  get hostname() {
    return this.req.hostname;
  },

  get protocol() {
    return this.req.protocol;
  },

  get secure() {
    return 'https' === this.protocol;
  },

  get isapi() {
    return this.req.isapi;
  },

  get referer() {
    return this.req.referer;
  }

};

var ResponseConstructor = {
  redirect: function () {
    var _redirect = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _this$res;

      var _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (_this$res = this.res).redirect.apply(_this$res, _args);

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function redirect() {
      return _redirect.apply(this, arguments);
    }

    return redirect;
  }(),
  replace: function () {
    var _replace = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _this$res2;

      var _args2 = arguments;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (_this$res2 = this.res).replace.apply(_this$res2, _args2);

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function replace() {
      return _replace.apply(this, arguments);
    }

    return replace;
  }(),
  reload: function () {
    var _reload = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.res.reload();

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function reload() {
      return _reload.apply(this, arguments);
    }

    return reload;
  }(),
  fetch: function () {
    var _fetch = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var _this$app;

      var _args4 = arguments;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (_this$app = this.app).fetch.apply(_this$app, _args4);

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function fetch() {
      return _fetch.apply(this, arguments);
    }

    return fetch;
  }(),
  get: function () {
    var _get = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var _this$app2;

      var _args5 = arguments;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (_this$app2 = this.app).get.apply(_this$app2, _args5);

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function get() {
      return _get.apply(this, arguments);
    }

    return get;
  }(),
  post: function () {
    var _post = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var _this$app3;

      var _args6 = arguments;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return (_this$app3 = this.app).post.apply(_this$app3, _args6);

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function post() {
      return _post.apply(this, arguments);
    }

    return post;
  }(),
  put: function () {
    var _put = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var _this$app4;

      var _args7 = arguments;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return (_this$app4 = this.app).put.apply(_this$app4, _args7);

            case 2:
              return _context7.abrupt("return", _context7.sent);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function put() {
      return _put.apply(this, arguments);
    }

    return put;
  }(),
  delete: function () {
    var _delete2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var _this$app5;

      var _args8 = arguments;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return (_this$app5 = this.app).delete.apply(_this$app5, _args8);

            case 2:
              return _context8.abrupt("return", _context8.sent);

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function _delete() {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};

function compose(middleware) {
  return function (context, next) {
    var index = -1;
    return dispatch(0);

    function dispatch(i) {
      if (i <= index) { return Promise.reject(new WoxError('[compose] next() called multiple times')); }
      index = i;
      var fn = middleware[i];
      if (i === middleware.length) { fn = next; }
      if (!fn) { return Promise.resolve(); }

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}

var ApplicationService =
/*#__PURE__*/
function (_History) {
  _inherits(ApplicationService, _History);

  function ApplicationService(mode) {
    var _this;

    _classCallCheck(this, ApplicationService);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ApplicationService).call(this, mode));
    _this.middleware = [];
    _this.context = Object.create(proto);
    _this.request = Object.create(RequestConstructor);
    _this.response = Object.create(ResponseConstructor);
    _this.contextRequestId = 0;
    _this.listener = null;
    return _this;
  }

  _createClass(ApplicationService, [{
    key: "serverCreateContext",
    value: function serverCreateContext(req, res) {
      var context = Object.create(this.context);
      var request = context.request = Object.create(this.request);
      var response = context.response = Object.create(this.response);
      context.app = request.app = response.app = this;
      context.req = request.req = response.req = req;
      context.res = request.res = response.res = res;
      request.ctx = response.ctx = context;
      request.response = response;
      response.request = request;
      context.status = 404;
      context.id = new Date().getTime() + '_' + this.contextRequestId++;
      return this.contextEvents(context);
    }
  }, {
    key: "contextEvents",
    value: function contextEvents(ctx) {
      var e = new EventEmitter();
      EventEmitter.Methods.forEach(function (i) {
        if (typeof e[i] === 'function') {
          Object.defineProperty(ctx, i, {
            value: e[i].bind(e)
          });
        }
      });
      return ctx;
    }
  }, {
    key: "serverHandleRequest",
    value: function () {
      var _serverHandleRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(ctx, fnMiddleware) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fnMiddleware(ctx).then(function () {
                  if (ctx.isapi) {
                    if (ctx.status === 440) {
                      if (ctx.body !== undefined) {
                        ctx.status = 200;
                      }
                    }
                  } else {
                    if (ctx.body !== undefined) {
                      if (ctx.status === 404) {
                        ctx.status = 200;
                      }
                    }
                  }

                  switch (ctx.status) {
                    case 404:
                      return Promise.reject(ctx.error('Not Find Request Path: ' + ctx.path, 404));

                    case 440:
                      if (!ctx.isapi) {
                        return Promise.reject(ctx.error('No Webview Found On ' + ctx.path, 440));
                      }

                    case 200:
                      return ctx.body;

                    default:
                      return Promise.reject(ctx.error(ctx.reason || 'Unknown Error', ctx.status));
                  }
                }).catch(function (e) {
                  if (!e.status) { e.status = 500; }
                  return Promise.reject(e);
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function serverHandleRequest(_x, _x2) {
        return _serverHandleRequest.apply(this, arguments);
      }

      return serverHandleRequest;
    }()
  }, {
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(options) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.history_installed) {
                  _context2.next = 2;
                  break;
                }

                throw proto.error('No history installed', 502);

              case 2:
                _context2.next = 4;
                return _get(_getPrototypeOf(ApplicationService.prototype), "history_run_process", this).call(this, options);

              case 4:
                result = _context2.sent;

                if (!(result instanceof WoxError)) {
                  _context2.next = 7;
                  break;
                }

                throw result;

              case 7:
                return _context2.abrupt("return", result);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetch(_x3) {
        return _fetch.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: "get",
    value: function () {
      var _get2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(url) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.fetch({
                  url: url,
                  method: 'GET'
                });

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function get(_x4) {
        return _get2.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(url, body) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.fetch({
                  url: url,
                  body: body,
                  method: 'POST'
                });

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function post(_x5, _x6) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: "put",
    value: function () {
      var _put = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(url, body) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.fetch({
                  url: url,
                  body: body,
                  method: 'PUT'
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function put(_x7, _x8) {
        return _put.apply(this, arguments);
      }

      return put;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(url) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.fetch({
                  url: url,
                  method: 'DELETE'
                });

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _delete(_x9) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "use",
    value: function use(fn) {
      this.middleware.push(fn);
      return this;
    }
  }, {
    key: "createServer",
    value: function () {
      var _createServer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(url) {
        var _this2 = this;

        var fn;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                fn = compose(this.middleware);

                _get(_getPrototypeOf(ApplicationService.prototype), "history_create_server", this).call(this,
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee7(req, res, next) {
                    var ctx;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            ctx = _this2.serverCreateContext(req, res);
                            _context7.next = 3;
                            return _this2.emit('start', ctx);

                          case 3:
                            _context7.next = 5;
                            return _this2.serverHandleRequest(ctx, fn).then(function (data) {
                              next(null);
                              return Promise.all([ctx.emit('success', data), _this2.emit('stop', ctx)]).then(function () {
                                return data;
                              });
                            }).catch(function (e) {
                              next(e);
                              var ignore = false;

                              e.preventDefault = function () {
                                return ignore = true;
                              };

                              return Promise.all([ctx.emit('error', e), _this2.emit('error', e), _this2.emit('stop', ctx)]).then(function () {
                                if (!ignore) {
                                  return Promise.reject(e);
                                }
                              });
                            });

                          case 5:
                            return _context7.abrupt("return", _context7.sent);

                          case 6:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x11, _x12, _x13) {
                    return _ref.apply(this, arguments);
                  };
                }());

                this.listener = _get(_getPrototypeOf(ApplicationService.prototype), "history_listen", this).call(this);
                _context8.next = 5;
                return _get(_getPrototypeOf(ApplicationService.prototype), "history_run_process", this).call(this, {
                  url: url
                });

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function createServer(_x10) {
        return _createServer.apply(this, arguments);
      }

      return createServer;
    }()
  }, {
    key: "destoryServer",
    value: function destoryServer() {
      if (this.listener) {
        this.listener();
      }
    }
  }]);

  return ApplicationService;
}(History);

var PluginModule =
/*#__PURE__*/
function () {
  function PluginModule(app, name, dependencies) {
    _classCallCheck(this, PluginModule);

    this.app = app;
    this.name = name;
    this.dependencies = dependencies;
    this.container = app.$plugin;
    app.$plugin.set(name, this);
    Object.defineProperty(this, '$config', {
      get: function get() {
        return app.$plugin.getConfig(name);
      }
    });
  }

  _createClass(PluginModule, [{
    key: "get",
    value: function get(dependency) {
      if (this.dependencies.indexOf(dependency) === -1) {
        throw proto.error("".concat(dependency, " is not one of ").concat(JSON.stringify(this.dependencies)));
      }

      return this.app.$plugin.get(dependency);
    }
  }, {
    key: "setDecorate",
    value: function setDecorate(value) {
      this.app.$plugin.setDecorate(value);
      return this;
    }
  }]);

  return PluginModule;
}();
var Container =
/*#__PURE__*/
function () {
  function Container(configs) {
    _classCallCheck(this, Container);

    this.stacks = {};
    this.configs = configs;
    this.decorates = {};
  }

  _createClass(Container, [{
    key: "set",
    value: function set(name, target) {
      this.stacks[name] = target;
      return this;
    }
  }, {
    key: "get",
    value: function get(name) {
      return this.stacks[name];
    }
  }, {
    key: "getConfig",
    value: function getConfig(name) {
      return this.configs[name];
    }
  }, {
    key: "setDecorate",
    value: function setDecorate(decorate) {
      var clazz = new decorate();
      this.decorates[clazz.name] = clazz;
      return this;
    }
  }, {
    key: "renderDecorateIntoInterface",
    value: function renderDecorateIntoInterface() {
      var _this = this;

      var _loop = function _loop(key) {
        var target = _this.decorates[key];

        if (typeof target.interfaceWillInject === 'function') {
          Interface[key] = function () {
            return target.interfaceWillInject.apply(target, arguments);
          };
        }
      };

      for (var key in this.decorates) {
        _loop(key);
      }
    }
  }]);

  return Container;
}();

var WoxViewPage = {
  name: 'WoxViewPage',
  computed: {
    webview: function webview() {
      return this.$root.webview;
    },
    props: function props() {
      return this.$root.props;
    }
  },
  created: function created() {
    var _this = this;

    this.$root.$on('enter', function (ctx) {
      var dynamicRenderer = _this.$refs.dynamicRenderer;

      if (dynamicRenderer) {
        if (typeof dynamicRenderer.$options.enter === 'function') {
          dynamicRenderer.$options.enter.call(dynamicRenderer, ctx);
        }

        _this.$root._virtualModel = dynamicRenderer;
      }
    });
    this.$root.$on('leave', function () {
      var dynamicRenderer = _this.$root._virtualModel;

      if (dynamicRenderer) {
        if (typeof dynamicRenderer.$options.leave === 'function') {
          dynamicRenderer.$options.leave.call(dynamicRenderer);
        }
      }
    });
  },
  render: function render(h) {
    if (!this.webview) { return; }
    return h(this.webview, {
      props: this.props,
      ref: 'dynamicRenderer'
    });
  }
};

var ApplicationAction =
/*#__PURE__*/
function () {
  function ApplicationAction(app, el, name) {
    _classCallCheck(this, ApplicationAction);

    this.app = app;
    this.el = el;
    this.name = name;
    this.url = null;
    this.sync = false;
    this.handle = null;
  }

  _createClass(ApplicationAction, [{
    key: "set",
    value: function set(value, arg) {
      this.url = value;
      this.sync = arg === 'sync';
    }
  }, {
    key: "bind",
    value: function bind(value, arg) {
      var _this = this;

      this.handle =
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof _this.app[_this.name] === 'function')) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return _this.app[_this.name](_this.url, _this.sync);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      this.el.addEventListener('click', this.handle);
      this.set(value, arg);
    }
  }, {
    key: "unbind",
    value: function unbind() {
      if (this.handle) { this.el.removeEventListener('click', this.handle); }

      if (this.el.__wox_directive_taqrget__) {
        delete this.el.__wox_directive_taqrget__;
      }
    }
  }]);

  return ApplicationAction;
}();

var WoxVueDirectives = (function (app) {
  ['redirect', 'replace', 'reload'].forEach(function (name) {
    Vue.directive(name, {
      bind: function bind(el, binding) {
        var target = new ApplicationAction(app, el, name);
        target.bind(binding.value, binding.arg);
        el.__wox_directive_taqrget__ = target;
      },
      unbind: function unbind(el) {
        if (el.__wox_directive_taqrget__) {
          el.__wox_directive_taqrget__.unbind();
        }
      },
      update: function update(el, binding) {
        if (el.__wox_directive_taqrget__) {
          el.__wox_directive_taqrget__.set(binding.value, binding.arg);
        }
      },
      componentUpdated: function componentUpdated(el, binding) {
        if (el.__wox_directive_taqrget__) {
          el.__wox_directive_taqrget__.set(binding.value, binding.arg);
        }
      }
    });
  });
});

var Parser =
/*#__PURE__*/
function () {
  function Parser() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Parser);

    this.configs = data;
    this.result = {};
  }

  _createClass(Parser, [{
    key: "render",
    value: function render() {
      this.CustomConfigRender();
      this.PluginConfigRender();
      return this.result;
    }
  }, {
    key: "CustomConfigRender",
    value: function CustomConfigRender() {
      var result = this.configs.custom_configs || [];
      var res = result.map(function (ret) {
        return ret.default || ret;
      });
      this.result.custom_configs = Object.assign.apply(Object, [{}].concat(_toConsumableArray(res)));
    }
  }, {
    key: "PluginConfigRender",
    value: function PluginConfigRender() {
      var result = this.configs.plugin_configs || {};
      this.result.plugin_configs = result.default || result;
    }
  }, {
    key: "VueInjectRender",
    value: function VueInjectRender() {
      var _this = this;

      var components = this.configs.component;
      var directives = this.configs.directive;
      var filters = this.configs.filter;
      var mixins = this.configs.mixin;
      components.forEach(function (context) {
        _this.ContextEach(context, function (key, component) {
          if (!component.name) { throw new WoxError("component miss name option in ".concat(key, ".")); }
          Vue.component(component.name, component);
        });
      });
      directives.forEach(function (context) {
        _this.ContextEach(context, function (key, directive) {
          var name = key.split('/').slice(-1)[0].split('.').slice(0, -1)[0];
          Vue.directive(name, directive);
        });
      });
      filters.forEach(function (context) {
        _this.ContextEach(context, function (key, filter) {
          var name = key.split('/').slice(-1)[0].split('.').slice(0, -1)[0];
          Vue.filter(name, filter);
        });
      });
      mixins.forEach(function (context) {
        _this.ContextEach(context, function (key, mixin) {
          return Vue.mixin(mixin);
        });
      });
    }
  }, {
    key: "ContextEach",
    value: function ContextEach(context, callback) {
      var keys = context.keys();
      keys.forEach(function (key) {
        var item = context(key).default;
        callback(key, item);
      });
    }
  }, {
    key: "PluginRender",
    value: function () {
      var _PluginRender = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(app) {
        var bootstraps, i, bootstrap, args, pluginExports;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                bootstraps = this.configs.bootstrap;
                i = 0;

              case 2:
                if (!(i < bootstraps.length)) {
                  _context.next = 13;
                  break;
                }

                bootstrap = bootstraps[i];
                args = [app];
                if (bootstrap.name) { args.push(new PluginModule(app, bootstrap.name, bootstrap.dependencies)); }
                pluginExports = bootstrap.exports.default || bootstrap.exports;

                if (!(typeof pluginExports === 'function')) {
                  _context.next = 10;
                  break;
                }

                _context.next = 10;
                return pluginExports.apply(void 0, args);

              case 10:
                i++;
                _context.next = 2;
                break;

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function PluginRender(_x) {
        return _PluginRender.apply(this, arguments);
      }

      return PluginRender;
    }()
  }, {
    key: "ControllerRender",
    value: function ControllerRender() {
      var _controllers = [];
      var controllers = this.configs.controller;

      for (var i = 0; i < controllers.length; i++) {
        var controllerContext = controllers[i];
        this.ContextEach(controllerContext, function (key, controller) {
          controller._filePath = key;

          var index = _controllers.indexOf(controller);

          if (index === -1) {
            _controllers.push(controller);
          }
        });
      }

      return _controllers;
    }
  }, {
    key: "DecorateRender",
    value: function DecorateRender(app) {
      var _this2 = this;

      var decorates = this.configs.decorate;
      decorates.forEach(function (decorateContext) {
        _this2.ContextEach(decorateContext, function (key, decorate) {
          return app.$plugin.setDecorate(decorate);
        });
      });
    }
  }, {
    key: "BuildVue",
    value: function BuildVue(app) {
      var _this3 = this;

      var el;

      if (!app.$config.el) {
        el = window.document.createElement('div');
        window.document.body.appendChild(el);
      } else {
        el = _typeof(app.$config.el) === 'object' ? app.$config.el : window.document.querySelector(app.$config.el);
      }

      ['redirect', 'replace', 'reload', 'get', 'post', 'put', 'delete'].forEach(function (param) {
        Vue.prototype['$' + param] = function () {
          if (typeof _this3[param] === 'function') {
            return _this3[param].apply(_this3, arguments);
          }
        };
      });
      WoxVueDirectives(app);
      Vue.component('WoxViewPage', WoxViewPage);
      var initData = {
        webview: null,
        props: null,
        installed: false
      };
      var options = {
        name: 'WoxRuntimeViewModel',
        data: function data() {
          return initData;
        },
        mounted: function mounted() {
          this.installed = true;
        },
        render: function render(h) {
          if (_this3.configs.view) { return h(_this3.configs.view.default || _this3.configs.view); }
          return h(WoxViewPage);
        }
      };
      app.emit('setup', options);
      var vue = new Vue(options);
      app.on('start', function (ctx) {
        if (ctx.isapi) { return; }
        vue.$emit('leave', ctx);
      });
      app.on('stop', function (ctx) {
        if (ctx.isapi) { return; }
        vue.$emit('enter', ctx);
      });
      vue.$mount(el);
      return vue;
    }
  }]);

  return Parser;
}();

/**
 * Default configs.
 */

var DEFAULT_DELIMITER = '/';
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
// "(\\d+)"  => [undefined, undefined, "\d+", undefined]
'(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse$1(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || DEFAULT_DELIMITER;
  var whitelist = options && options.whitelist || undefined;
  var pathEscaped = false;
  var res;

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      pathEscaped = true;
      continue;
    }

    var prev = '';
    var name = res[2];
    var capture = res[3];
    var group = res[4];
    var modifier = res[5];

    if (!pathEscaped && path.length) {
      var k = path.length - 1;
      var c = path[k];
      var matches = whitelist ? whitelist.indexOf(c) > -1 : true;

      if (matches) {
        prev = c;
        path = path.slice(0, k);
      }
    } // Push the current path onto the tokens.


    if (path) {
      tokens.push(path);
      path = '';
      pathEscaped = false;
    }

    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var pattern = capture || group;
    var delimiter = prev || defaultDelimiter;
    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter === defaultDelimiter ? delimiter : delimiter + defaultDelimiter) + ']+?'
    });
  } // Push any remaining characters.


  if (path || index < str.length) {
    tokens.push(path + str.substr(index));
  }

  return tokens;
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */

function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


function escapeGroup(group) {
  return group.replace(/([=!:$/()])/g, '\\$1');
}
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */


function flags(options) {
  return options && options.sensitive ? '' : 'i';
}
/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */


function regexpToRegexp(path, keys) {
  if (!keys) { return path; } // Use a negative lookahead to match only capturing groups.

  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      });
    }
  }

  return path;
}
/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */


function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options));
}
/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */


function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse$1(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */


function tokensToRegExp(tokens, keys, options) {
  options = options || {};
  var strict = options.strict;
  var start = options.start !== false;
  var end = options.end !== false;
  var delimiter = options.delimiter || DEFAULT_DELIMITER;
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
  var route = start ? '^' : ''; // Iterate over the tokens and create our regexp string.

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var capture = token.repeat ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*' : token.pattern;
      if (keys) { keys.push(token); }

      if (token.optional) {
        if (!token.prefix) {
          route += '(' + capture + ')?';
        } else {
          route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?';
        }
      } else {
        route += escapeString(token.prefix) + '(' + capture + ')';
      }
    }
  }

  if (end) {
    if (!strict) { route += '(?:' + escapeString(delimiter) + ')?'; }
    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === 'string' ? endToken[endToken.length - 1] === delimiter : endToken === undefined;
    if (!strict) { route += '(?:' + escapeString(delimiter) + '(?=' + endsWith + '))?'; }
    if (!isEndDelimited) { route += '(?=' + escapeString(delimiter) + '|' + endsWith + ')'; }
  }

  return new RegExp(route, flags(options));
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */

function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys);
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(
    /** @type {!Array} */
    path, keys, options);
  }

  return stringToRegexp(
  /** @type {string} */
  path, keys, options);
}

/**
 * Initialize a new routing Layer with given `method`, `path`, and `middleware`.
 *
 * @param {String|RegExp} path Path string or regular expression.
 * @param {Array} methods Array of HTTP verbs.
 * @param {Array} middleware Layer callback/middleware or series of.
 * @param {Object=} opts
 * @param {String=} opts.name route name
 * @param {String=} opts.sensitive case sensitive (default: false)
 * @param {String=} opts.strict require the trailing slash (default: false)
 * @returns {Layer}
 * @private
 */

function Layer(path, methods, middleware, opts) {
  this.opts = opts || {};
  this.name = this.opts.name || null;
  this.methods = [];
  this.paramNames = [];
  this.stack = Array.isArray(middleware) ? middleware : [middleware];
  methods.forEach(function (method) {
    var l = this.methods.push(method.toUpperCase());

    if (this.methods[l - 1] === 'GET') {
      this.methods.unshift('HEAD');
    }
  }, this); // ensure middleware is a function

  this.stack.forEach(function (fn) {
    var type = _typeof(fn);

    if (type !== 'function') {
      throw new Error(methods.toString() + " `" + (this.opts.name || path) + "`: `middleware` " + "must be a function, not `" + type + "`");
    }
  }, this);
  this.path = path;
  this.regexp = pathToRegexp(path, this.paramNames, this.opts);
}
/**
 * Returns whether request `path` matches route.
 *
 * @param {String} path
 * @returns {Boolean}
 * @private
 */

Layer.prototype.match = function (path) {
  return this.regexp.test(path);
};
/**
 * Returns map of URL parameters for given `path` and `paramNames`.
 *
 * @param {String} path
 * @param {Array.<String>} captures
 * @param {Object=} existingParams
 * @returns {Object}
 * @private
 */


Layer.prototype.params = function (path, captures, existingParams) {
  var params = existingParams || {};

  for (var len = captures.length, i = 0; i < len; i++) {
    if (this.paramNames[i]) {
      var c = captures[i];
      params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
    }
  }

  return params;
};
/**
 * Returns array of regexp url path captures.
 *
 * @param {String} path
 * @returns {Array.<String>}
 * @private
 */


Layer.prototype.captures = function (path) {
  if (this.opts.ignoreCaptures) { return []; }
  return path.match(this.regexp).slice(1);
};
/**
 * Run validations on route named parameters.
 *
 * @example
 *
 * ```javascript
 * router
 *   .param('user', function (id, ctx, next) {
 *     ctx.user = users[id];
 *     if (!user) return ctx.status = 404;
 *     next();
 *   })
 *   .get('/users/:user', function (ctx, next) {
 *     ctx.body = ctx.user;
 *   });
 * ```
 *
 * @param {String} param
 * @param {Function} middleware
 * @returns {Layer}
 * @private
 */


Layer.prototype.param = function (param, fn) {
  var stack = this.stack;
  var params = this.paramNames;

  var middleware = function middleware(ctx, next) {
    return fn.call(this, ctx.params[param], ctx, next);
  };

  middleware.param = param;
  var names = params.map(function (p) {
    return p.name;
  });
  var x = names.indexOf(param);

  if (x > -1) {
    // iterate through the stack, to figure out where to place the handler fn
    stack.some(function (fn, i) {
      // param handlers are always first, so when we find an fn w/o a param property, stop here
      // if the param handler at this part of the stack comes after the one we are adding, stop here
      if (!fn.param || names.indexOf(fn.param) > x) {
        // inject this param handler right before the current item
        stack.splice(i, 0, middleware);
        return true; // then break the loop
      }
    });
  }

  return this;
};
/**
 * Prefix route path.
 *
 * @param {String} prefix
 * @returns {Layer}
 * @private
 */


Layer.prototype.setPrefix = function (prefix) {
  if (this.path) {
    this.path = prefix + this.path;
    this.paramNames = [];
    this.regexp = pathToRegexp(this.path, this.paramNames, this.opts);
  }

  return this;
};
/**
 * Safe decodeURIComponent, won't throw any error.
 * If `decodeURIComponent` error happen, just return the original value.
 *
 * @param {String} text
 * @returns {String} URL decode original string.
 * @private
 */


function safeDecodeURIComponent(text) {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    return text;
  }
}

/**
 * RESTful resource routing middleware for koa.
 *
 * @author Alex Mingoia <talk@alexmingoia.com>
 * @link https://github.com/alexmingoia/koa-router
 */
/**
 * Create a new router.
 *
 * @example
 *
 * Basic usage:
 *
 * ```javascript
 * var Koa = require('koa');
 * var Router = require('koa-router');
 *
 * var app = new Koa();
 * var router = new Router();
 *
 * router.get('/', (ctx, next) => {
 *   // ctx.router available
 * });
 *
 * app
 *   .use(router.routes())
 *   .use(router.allowedMethods());
 * ```
 *
 * @alias module:koa-router
 * @param {Object=} opts
 * @param {String=} opts.prefix prefix router paths
 * @constructor
 */

function Router(opts) {
  if (!(this instanceof Router)) {
    return new Router(opts);
  }

  this.opts = opts || {};
  this.methods = this.opts.methods || ['GET'];
  this.params = {};
  this.stack = [];
}
/**
 * Create `router.verb()` methods, where *verb* is one of the HTTP verbs such
 * as `router.get()` or `router.post()`.
 *
 * Match URL patterns to callback functions or controller actions using `router.verb()`,
 * where **verb** is one of the HTTP verbs such as `router.get()` or `router.post()`.
 *
 * Additionaly, `router.all()` can be used to match against all methods.
 *
 * ```javascript
 * router
 *   .get('/', (ctx, next) => {
 *     ctx.body = 'Hello World!';
 *   })
 *   .post('/users', (ctx, next) => {
 *     // ...
 *   })
 *   .put('/users/:id', (ctx, next) => {
 *     // ...
 *   })
 *   .del('/users/:id', (ctx, next) => {
 *     // ...
 *   })
 *   .all('/users/:id', (ctx, next) => {
 *     // ...
 *   });
 * ```
 *
 * When a route is matched, its path is available at `ctx._matchedRoute` and if named,
 * the name is available at `ctx._matchedRouteName`
 *
 * Route paths will be translated to regular expressions using
 * [path-to-regexp](https://github.com/pillarjs/path-to-regexp).
 *
 * Query strings will not be considered when matching requests.
 *
 * #### Named routes
 *
 * Routes can optionally have names. This allows generation of URLs and easy
 * renaming of URLs during development.
 *
 * ```javascript
 * router.get('user', '/users/:id', (ctx, next) => {
 *  // ...
 * });
 *
 * // => "/users/3"
 * ```
 *
 * #### Multiple middleware
 *
 * Multiple middleware may be given:
 *
 * ```javascript
 * router.get(
 *   '/users/:id',
 *   (ctx, next) => {
 *     return User.findOne(ctx.params.id).then(function(user) {
 *       ctx.user = user;
 *       next();
 *     });
 *   },
 *   ctx => {
 *     console.log(ctx.user);
 *     // => { id: 17, name: "Alex" }
 *   }
 * );
 * ```
 *
 * ### Nested routers
 *
 * Nesting routers is supported:
 *
 * ```javascript
 * var forums = new Router();
 * var posts = new Router();
 *
 * posts.get('/', (ctx, next) => {...});
 * posts.get('/:pid', (ctx, next) => {...});
 * forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());
 *
 * // responds to "/forums/123/posts" and "/forums/123/posts/123"
 * app.use(forums.routes());
 * ```
 *
 * #### Router prefixes
 *
 * Route paths can be prefixed at the router level:
 *
 * ```javascript
 * var router = new Router({
 *   prefix: '/users'
 * });
 *
 * router.get('/', ...); // responds to "/users"
 * router.get('/:id', ...); // responds to "/users/:id"
 * ```
 *
 * #### URL parameters
 *
 * Named route parameters are captured and added to `ctx.params`.
 *
 * ```javascript
 * router.get('/:category/:title', (ctx, next) => {
 *   console.log(ctx.params);
 *   // => { category: 'programming', title: 'how-to-node' }
 * });
 * ```
 *
 * The [path-to-regexp](https://github.com/pillarjs/path-to-regexp) module is
 * used to convert paths to regular expressions.
 *
 * @name get|put|post|patch|delete|del
 * @memberof module:koa-router.prototype
 * @param {String} path
 * @param {Function=} middleware route middleware(s)
 * @param {Function} callback route callback
 * @returns {Router}
 */

Methods.forEach(function (method) {
  Router.prototype[method.toLowerCase()] = function (name, path, middleware) {
    var middleware;

    if (typeof path === 'string' || path instanceof RegExp) {
      middleware = Array.prototype.slice.call(arguments, 2);
    } else {
      middleware = Array.prototype.slice.call(arguments, 1);
      path = name;
      name = null;
    }

    this.register(path, [method.toUpperCase()], middleware, {
      name: name
    });
    return this;
  };
}); // Alias for `router.delete()` because delete is a reserved word

Router.prototype.del = Router.prototype['delete'];
/**
 * Use given middleware.
 *
 * Middleware run in the order they are defined by `.use()`. They are invoked
 * sequentially, requests start at the first middleware and work their way
 * "down" the middleware stack.
 *
 * @example
 *
 * ```javascript
 * // session middleware will run before authorize
 * router
 *   .use(session())
 *   .use(authorize());
 *
 * // use middleware only with given path
 * router.use('/users', userAuth());
 *
 * // or with an array of paths
 * router.use(['/users', '/admin'], userAuth());
 *
 * app.use(router.routes());
 * ```
 *
 * @param {String=} path
 * @param {Function} middleware
 * @param {Function=} ...
 * @returns {Router}
 */

Router.prototype.use = function () {
  var router = this;
  var middleware = Array.prototype.slice.call(arguments);
  var path; // support array of paths

  if (Array.isArray(middleware[0]) && typeof middleware[0][0] === 'string') {
    middleware[0].forEach(function (p) {
      router.use.apply(router, [p].concat(middleware.slice(1)));
    });
    return this;
  }

  var hasPath = typeof middleware[0] === 'string';

  if (hasPath) {
    path = middleware.shift();
  }

  middleware.forEach(function (m) {
    if (m.router) {
      m.router.stack.forEach(function (nestedLayer) {
        if (path) { nestedLayer.setPrefix(path); }
        if (router.opts.prefix) { nestedLayer.setPrefix(router.opts.prefix); }
        router.stack.push(nestedLayer);
      });

      if (router.params) {
        Object.keys(router.params).forEach(function (key) {
          m.router.param(key, router.params[key]);
        });
      }
    } else {
      router.register(path || '(.*)', [], m, {
        end: false,
        ignoreCaptures: !hasPath
      });
    }
  });
  return this;
};
/**
 * Set the path prefix for a Router instance that was already initialized.
 *
 * @example
 *
 * ```javascript
 * router.prefix('/things/:thing_id')
 * ```
 *
 * @param {String} prefix
 * @returns {Router}
 */


Router.prototype.prefix = function (prefix) {
  prefix = prefix.replace(/\/$/, '');
  this.opts.prefix = prefix;
  this.stack.forEach(function (route) {
    route.setPrefix(prefix);
  });
  return this;
};
/**
 * Returns router middleware which dispatches a route matching the request.
 *
 * @returns {Function}
 */


Router.prototype.routes = Router.prototype.middleware = function () {
  var router = this;

  var dispatch = function dispatch(ctx, next) {
    var path = router.opts.routerPath || ctx.routerPath || ctx.path;
    var matched = router.match(path, ctx.method);
    var layerChain;

    if (ctx.matched) {
      ctx.matched.push.apply(ctx.matched, matched.path);
    } else {
      ctx.matched = matched.path;
    }

    ctx.router = router;
    if (!matched.route) { return next(); }
    var matchedLayers = matched.pathAndMethod;
    var mostSpecificLayer = matchedLayers[matchedLayers.length - 1];
    ctx._matchedRoute = mostSpecificLayer.path;

    if (mostSpecificLayer.name) {
      ctx._matchedRouteName = mostSpecificLayer.name;
    }

    layerChain = matchedLayers.reduce(function (memo, layer) {
      memo.push(function (ctx, next) {
        ctx.captures = layer.captures(path, ctx.captures);
        ctx.params = layer.params(path, ctx.captures, ctx.params);
        ctx.routerName = layer.name;
        return next();
      });
      return memo.concat(layer.stack);
    }, []);
    return compose(layerChain)(ctx, next);
  };

  dispatch.router = this;
  return dispatch;
};
/**
 * Register route with all methods.
 *
 * @param {String} name Optional.
 * @param {String} path
 * @param {Function=} middleware You may also pass multiple middleware.
 * @param {Function} callback
 * @returns {Router}
 * @private
 */


Router.prototype.all = function (name, path, middleware) {
  var middleware;

  if (typeof path === 'string') {
    middleware = Array.prototype.slice.call(arguments, 2);
  } else {
    middleware = Array.prototype.slice.call(arguments, 1);
    path = name;
    name = null;
  }

  this.register(path, methods, middleware, {
    name: name
  });
  return this;
};
/**
 * Create and register a route.
 *
 * @param {String} path Path string.
 * @param {Array.<String>} methods Array of HTTP verbs.
 * @param {Function} middleware Multiple middleware also accepted.
 * @returns {Layer}
 * @private
 */


Router.prototype.register = function (path, methods, middleware, opts) {
  opts = opts || {};
  var router = this;
  var stack = this.stack; // support array of paths

  if (Array.isArray(path)) {
    path.forEach(function (p) {
      router.register.call(router, p, methods, middleware, opts);
    });
    return this;
  } // create route


  var route = new Layer(path, methods, middleware, {
    end: opts.end === false ? opts.end : true,
    name: opts.name,
    sensitive: opts.sensitive || this.opts.sensitive || false,
    strict: opts.strict || this.opts.strict || false,
    prefix: opts.prefix || this.opts.prefix || "",
    ignoreCaptures: opts.ignoreCaptures
  });

  if (this.opts.prefix) {
    route.setPrefix(this.opts.prefix);
  } // add parameter middleware


  Object.keys(this.params).forEach(function (param) {
    route.param(param, this.params[param]);
  }, this);
  stack.push(route);
  return route;
};
/**
 * Lookup route with given `name`.
 *
 * @param {String} name
 * @returns {Layer|false}
 */


Router.prototype.route = function (name) {
  var routes = this.stack;

  for (var len = routes.length, i = 0; i < len; i++) {
    if (routes[i].name && routes[i].name === name) {
      return routes[i];
    }
  }

  return false;
};
/**
 * Match given `path` and return corresponding routes.
 *
 * @param {String} path
 * @param {String} method
 * @returns {Object.<path, pathAndMethod>} returns layers that matched path and
 * path and method.
 * @private
 */


Router.prototype.match = function (path, method) {
  var layers = this.stack;
  var layer;
  var matched = {
    path: [],
    pathAndMethod: [],
    route: false
  };

  for (var len = layers.length, i = 0; i < len; i++) {
    layer = layers[i];

    if (layer.match(path)) {
      matched.path.push(layer);

      if (layer.methods.length === 0 || ~layer.methods.indexOf(method)) {
        matched.pathAndMethod.push(layer);
        if (layer.methods.length) { matched.route = true; }
      }
    }
  }

  return matched;
};
/**
 * Run middleware for named route parameters. Useful for auto-loading or
 * validation.
 *
 * @example
 *
 * ```javascript
 * router
 *   .param('user', (id, ctx, next) => {
 *     ctx.user = users[id];
 *     if (!ctx.user) return ctx.status = 404;
 *     return next();
 *   })
 *   .get('/users/:user', ctx => {
 *     ctx.body = ctx.user;
 *   })
 *   .get('/users/:user/friends', ctx => {
 *     return ctx.user.getFriends().then(function(friends) {
 *       ctx.body = friends;
 *     });
 *   })
 *   // /users/3 => {"id": 3, "name": "Alex"}
 *   // /users/3/friends => [{"id": 4, "name": "TJ"}]
 * ```
 *
 * @param {String} param
 * @param {Function} middleware
 * @returns {Router}
 */


Router.prototype.param = function (param, middleware) {
  this.params[param] = middleware;
  this.stack.forEach(function (route) {
    route.param(param, middleware);
  });
  return this;
};

function ControllerParser(app, controllers) {
  var decorates = app.$plugin.decorates;

  var _controllers = controllers.slice(0).sort(function (a, b) {
    var aIndex = Reflect.getOwnMetadata('Index', a) || 0;
    var bIndex = Reflect.getOwnMetadata('Index', b) || 0;
    return aIndex - bIndex;
  });

  _controllers.forEach(function (controller) {
    var _app$$router;

    var prefix = Reflect.getMetadata('Controller', controller);
    var $route = new Router();
    var uses = Reflect.getMetadata('Middleware', controller) || [];
    var params = Reflect.getMetadata('Param', controller) || [];
    params.forEach(function (param) {
      return $route.param.apply($route, [param.id].concat(_toConsumableArray(param.middlewares)));
    });
    var controllerProperties = Object.getOwnPropertyNames(controller.prototype);

    var _loop = function _loop(i) {
      var property = controllerProperties[i];
      if (property === 'constructor') { return "continue"; }
      var middlewares = Reflect.getOwnMetadata('Middleware', controller.prototype[property]) || [];
      var Https = Reflect.getOwnMetadata('Http', controller.prototype[property]);
      var decorateOptions = {};

      for (var decorate in decorates) {
        var _decorateResult = decorates[decorate].get(controller.prototype[property]);

        if (_decorateResult !== undefined) {
          decorateOptions[decorate] = {
            value: _decorateResult,
            target: decorates[decorate]
          };
        }
      }

      if (Https) {
        Https.forEach(function (http) {
          var _middlewares = middlewares.slice(0);

          _middlewares.push(
          /*#__PURE__*/
          function () {
            var _ref = _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee(ctx, next) {
              var _controller, options, option, _target, data, result;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      ctx.status = 440;
                      _controller = new controller(ctx);

                      if (!_controller.ctx) {
                        Object.defineProperty(_controller, 'ctx', {
                          get: function get() {
                            return ctx;
                          }
                        });
                      }

                      options = {};

                      for (option in decorateOptions) {
                        _target = decorateOptions[option].target;
                        data = decorateOptions[option].value;

                        if (typeof _target.interfaceDidRendered === 'function') {
                          _target.interfaceDidRendered(data, {
                            options: options,
                            ctx: ctx
                          });
                        }
                      }

                      _context.next = 7;
                      return _controller[property].call(_controller, options);

                    case 7:
                      result = _context.sent;

                      if (result !== undefined) {
                        ctx.body = result;
                      }

                    case 9:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }());

          $route[http.method.toLowerCase()].apply($route, [http.prefix].concat(_toConsumableArray(_middlewares)));
        });
      }
    };

    for (var i = 0; i < controllerProperties.length; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") { continue; }
    }

    (_app$$router = app.$router).use.apply(_app$$router, [prefix].concat(_toConsumableArray(uses), [$route.routes()]));
  });
}

var Interface$1 =
/*#__PURE__*/
function () {
  function Interface(name) {
    _classCallCheck(this, Interface);

    this.name = name;
  }

  _createClass(Interface, [{
    key: "set",
    value: function set(target, value) {
      Reflect.defineMetadata(this.name, value, target);
    }
  }, {
    key: "get",
    value: function get(target) {
      return Reflect.getMetadata(this.name, target);
    }
  }]);

  return Interface;
}();

var Service =
/*#__PURE__*/
function (_Interface) {
  _inherits(Service, _Interface);

  function Service() {
    _classCallCheck(this, Service);

    return _possibleConstructorReturn(this, _getPrototypeOf(Service).call(this, 'Service'));
  }

  _createClass(Service, [{
    key: "interfaceWillInject",
    value: function interfaceWillInject(key, clazz) {
      var _this = this;

      return function (target, propertyKey, descriptor) {
        if (!propertyKey && !descriptor) { return; }

        var services = _this.get(descriptor.value);

        if (!services) { services = {}; }
        services[key] = clazz;

        _this.set(descriptor.value, services);
      };
    }
  }, {
    key: "interfaceDidRendered",
    value: function interfaceDidRendered(Services, _ref) {
      var options = _ref.options,
          ctx = _ref.ctx;
      var _services = {};

      for (var service in Services) {
        _services[service] = new Services[service](ctx);

        if (!_services[service].ctx) {
          Object.defineProperty(_services[service], 'ctx', {
            get: function get() {
              return ctx;
            }
          });
        }
      }

      if (Object.keys(_services).length > 0) {
        options.Service = _services;
      }
    }
  }]);

  return Service;
}(Interface$1);

/**
 * 配置参数
 * @param {string} mode [*hash|html5] history监听模式
 * @param {HTMLElement|string} el [undefined] 被注入的DOM节点 
 */

var Wox =
/*#__PURE__*/
function (_Application) {
  _inherits(Wox, _Application);

  function Wox(config) {
    var _this;

    _classCallCheck(this, Wox);

    var parser = new Parser(config);
    var parsedConfigs = parser.render();
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Wox).call(this, parsedConfigs.mode || 'hash'));
    Vue.prototype.$app = _assertThisInitialized(_this);
    _this.$parser = parser;
    _this.$router = new Router();
    _this.$env = process.env.NODE_ENV || 'development';
    _this.$plugin = new Container(parsedConfigs.plugin_configs);
    Object.defineProperty(_assertThisInitialized(_this), '$config', {
      get: function get() {
        return parsedConfigs.custom_configs;
      }
    });
    parser.VueInjectRender(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Wox, [{
    key: "$fetch",
    value: function () {
      var _$fetch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _get2;

        var _len,
            args,
            _key,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = _args[_key];
                }

                _context.next = 3;
                return (_get2 = _get(_getPrototypeOf(Wox.prototype), "fetch", this)).call.apply(_get2, [this].concat(args));

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function $fetch() {
        return _$fetch.apply(this, arguments);
      }

      return $fetch;
    }()
  }, {
    key: "$get",
    value: function () {
      var _$get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _get3;

        var _len2,
            args,
            _key2,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                for (_len2 = _args2.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = _args2[_key2];
                }

                _context2.next = 3;
                return (_get3 = _get(_getPrototypeOf(Wox.prototype), "get", this)).call.apply(_get3, [this].concat(args));

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function $get() {
        return _$get.apply(this, arguments);
      }

      return $get;
    }()
  }, {
    key: "$post",
    value: function () {
      var _$post = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var _get4;

        var _len3,
            args,
            _key3,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                for (_len3 = _args3.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                  args[_key3] = _args3[_key3];
                }

                _context3.next = 3;
                return (_get4 = _get(_getPrototypeOf(Wox.prototype), "post", this)).call.apply(_get4, [this].concat(args));

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function $post() {
        return _$post.apply(this, arguments);
      }

      return $post;
    }()
  }, {
    key: "$put",
    value: function () {
      var _$put = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _get5;

        var _len4,
            args,
            _key4,
            _args4 = arguments;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                for (_len4 = _args4.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                  args[_key4] = _args4[_key4];
                }

                _context4.next = 3;
                return (_get5 = _get(_getPrototypeOf(Wox.prototype), "put", this)).call.apply(_get5, [this].concat(args));

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function $put() {
        return _$put.apply(this, arguments);
      }

      return $put;
    }()
  }, {
    key: "$delete",
    value: function () {
      var _$delete = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var _get6;

        var _len5,
            args,
            _key5,
            _args5 = arguments;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                for (_len5 = _args5.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                  args[_key5] = _args5[_key5];
                }

                _context5.next = 3;
                return (_get6 = _get(_getPrototypeOf(Wox.prototype), "delete", this)).call.apply(_get6, [this].concat(args));

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function $delete() {
        return _$delete.apply(this, arguments);
      }

      return $delete;
    }()
  }, {
    key: "$redirect",
    value: function () {
      var _$redirect = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var _get7;

        var _len6,
            args,
            _key6,
            _args6 = arguments;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                for (_len6 = _args6.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                  args[_key6] = _args6[_key6];
                }

                _context6.next = 3;
                return (_get7 = _get(_getPrototypeOf(Wox.prototype), "redirect", this)).call.apply(_get7, [this].concat(args));

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function $redirect() {
        return _$redirect.apply(this, arguments);
      }

      return $redirect;
    }()
  }, {
    key: "$replace",
    value: function () {
      var _$replace = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var _get8;

        var _len7,
            args,
            _key7,
            _args7 = arguments;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                for (_len7 = _args7.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                  args[_key7] = _args7[_key7];
                }

                _context7.next = 3;
                return (_get8 = _get(_getPrototypeOf(Wox.prototype), "replace", this)).call.apply(_get8, [this].concat(args));

              case 3:
                return _context7.abrupt("return", _context7.sent);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function $replace() {
        return _$replace.apply(this, arguments);
      }

      return $replace;
    }()
  }, {
    key: "$reload",
    value: function () {
      var _$reload = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var _get9;

        var _len8,
            args,
            _key8,
            _args8 = arguments;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                for (_len8 = _args8.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                  args[_key8] = _args8[_key8];
                }

                _context8.next = 3;
                return (_get9 = _get(_getPrototypeOf(Wox.prototype), "reload", this)).call.apply(_get9, [this].concat(args));

              case 3:
                return _context8.abrupt("return", _context8.sent);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function $reload() {
        return _$reload.apply(this, arguments);
      }

      return $reload;
    }()
  }, {
    key: "render",
    value: function () {
      var _render = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(webview, props) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this.$vue) {
                  _context9.next = 2;
                  break;
                }

                throw this.context.error('Vue is not installed.');

              case 2:
                if (webview) {
                  _context9.next = 4;
                  break;
                }

                throw this.context.error('webview required.');

              case 4:
                this.$vue.webview = webview;
                this.$vue.props = props;
                _context9.next = 8;
                return new Promise(function (resolve) {
                  return Vue.nextTick(resolve);
                });

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function render(_x, _x2) {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: "createServer",
    value: function () {
      var _createServer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(url) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.$parser.PluginRender(this);

              case 2:
                _context10.next = 4;
                return this.emit('PluginDidInstalled');

              case 4:
                this.$plugin.setDecorate(Service);
                this.$parser.DecorateRender(this);
                this.$plugin.renderDecorateIntoInterface();
                _context10.next = 9;
                return this.emit('DecorateDidInstalled');

              case 9:
                ControllerParser(this, this.$parser.ControllerRender());
                _context10.next = 12;
                return this.emit('RouterWillInstall');

              case 12:
                this.use(this.$router.routes());
                _context10.next = 15;
                return this.emit('RouterDidInstalled');

              case 15:
                this.$vue = this.$parser.BuildVue(this);
                _context10.next = 18;
                return this.emit('ServerWillCreate');

              case 18:
                _context10.next = 20;
                return _get(_getPrototypeOf(Wox.prototype), "createServer", this).call(this, url);

              case 20:
                _context10.next = 22;
                return this.emit('ServerDidCreated');

              case 22:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function createServer(_x3) {
        return _createServer.apply(this, arguments);
      }

      return createServer;
    }()
  }]);

  return Wox;
}(ApplicationService);

export default Wox;
export { Http, Interface, Controller, Index, Middleware, Param };
