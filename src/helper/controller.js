import Router from '../router/index';
export default function ControllerParser(app, controllers) {
  const _controllers = controllers.slice(0).sort((a, b) => {
    const aIndex = Reflect.getOwnMetadata('Index', a) || 0;
    const bIndex = Reflect.getOwnMetadata('Index', b) || 0;
    return aIndex - bIndex;
  });
  _controllers.forEach(controller => {
    const prefix = Reflect.getMetadata('Controller', controller);
    const $route = new Router();
    const uses = Reflect.getMetadata('Middleware', controller) || [];
    const params = Reflect.getMetadata('Param', controller) || [];
    params.forEach(param => $route.param(param.id, ...param.middlewares));
    const controllerProperties = Object.getOwnPropertyNames(controller.prototype);
    for (let i = 0; i < controllerProperties.length; i++) {
      const property = controllerProperties[i];
      if (property === 'constructor') continue;
      const middlewares = Reflect.getOwnMetadata('Middleware', controller.prototype[property]) || [];
      const Https = Reflect.getOwnMetadata('Http', controller.prototype[property]);
      const Services = Reflect.getOwnMetadata('Service', controller.prototype[property]) || {};
      if (Https) {
        Https.forEach(http => {
          const _middlewares = middlewares.slice(0);
          _middlewares.push(async (ctx, next) => {
            const _services = {};
            for (const service in Services) {
              _services[service] = new Services[service](ctx);
            }
            const _controller = new controller(ctx);
            ctx.status = 440;
            await _controller[property].call(_controller, ctx, next, _services);
          });
          $route[http.method.toLowerCase()](http.prefix, ..._middlewares);
        });
      }
    }
    app.$router.use(prefix, ...uses, $route.routes());
  });
}