import Interface from './interface';
export default class Service extends Interface {
  constructor() {
    super('Service');
  }

  interfaceWillInject(key, clazz) {
    return (target, propertyKey, descriptor) => {
      if (!propertyKey && !descriptor) return;
      let services = this.get(descriptor.value);
      if (!services) services = {};
      services[key] = clazz;
      this.set(descriptor.value, services);
    }
  }

  interfaceDidRendered(Services, { options, ctx }) {
    const _services = {};
    for (const service in Services) {
      _services[service] = new Services[service](ctx);
      if (!_services[service].ctx) {
        Object.defineProperty(_services[service], 'ctx', {
          get() {
            return ctx;
          }
        })
      }
    }
    if (Object.keys(_services).length > 0) {
      options.Service = _services;
    }
  }
}