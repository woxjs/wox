import 'reflect-metadata';
import { Methods } from './index';
export const Http = {};

Methods.forEach(method => {
  Http[method] = (path, key, desc) => {
    if (typeof path === 'string') {
      return (target, propertyKey, descriptor) => {
        let HttpMetaData = Reflect.getMetadata('Http', descriptor.value);
        if (!HttpMetaData) HttpMetaData = [];
        HttpMetaData.unshift({
          method: method,
          prefix: path
        });
        Reflect.defineMetadata('Http', HttpMetaData, descriptor.value);
      }
    } else {
      let HttpMetaData = Reflect.getMetadata('Http', desc.value);
      if (!HttpMetaData) HttpMetaData = [];
      HttpMetaData.unshift({
        method: method,
        prefix: '(/)?'
      });
      Reflect.defineMetadata('Http', HttpMetaData, desc.value);
    }
  }
});

export function Controller(prefix) {
  if (typeof prefix === 'function') {
    Reflect.defineMetadata('Controller', '/', prefix);
    return Reflect.defineMetadata('Index', 99, prefix);
  }
  return target => Reflect.defineMetadata('Controller', prefix, target);
}

export function Index(i) {
  return (target, propertyKey, descriptor) => {
    if (!propertyKey && !descriptor) {
      return Reflect.defineMetadata('Index', i, target);
    }
  }
}

export function Middleware(...args) {
  return (target, propertyKey, descriptor) => {
    if (!propertyKey && !descriptor) {
      let parentMiddlewares = Reflect.getMetadata('Middleware', target);
      if (!parentMiddlewares) parentMiddlewares = [];
      parentMiddlewares.unshift(...args);
      Reflect.defineMetadata('Middleware', parentMiddlewares, target);
    } else {
      let childMiddlewares = Reflect.getMetadata('Middleware', target);
      if (!childMiddlewares) childMiddlewares = [];
      childMiddlewares.unshift(...args);
      Reflect.defineMetadata('Middleware', childMiddlewares, descriptor.value);
    }
  }
}

export function Param(id, ...args) {
  return (target, propertyKey, descriptor) => {
    if (!propertyKey && !descriptor) {
      let Params = Reflect.getMetadata('Param', target);
      if (!Params) Params = [];
      Params.push({
        id: id,
        middlewares: args
      });
      Reflect.defineMetadata('Param', Params, target);
    }
  }
}

export function Service(key, clazz) {
  return (target, propertyKey, descriptor) => {
    if (!propertyKey && !descriptor) return;
    let services = Reflect.getMetadata('Param', descriptor.value);
    if (!services) services = {};
    services[key] = clazz;
    Reflect.defineMetadata('Service', services, descriptor.value);
  }
}