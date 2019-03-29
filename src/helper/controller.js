import Router from '../router/index'
import { wrapContext, isVnode, wrapVnodeComponent } from './wrap'
export default function ControllerParser (app, controllers) {
  const decorates = app.$plugin.decorates
  const _controllers = controllers.slice(0).sort((a, b) => {
    const aIndex = Reflect.getOwnMetadata('Index', a) || 0
    const bIndex = Reflect.getOwnMetadata('Index', b) || 0
    return aIndex - bIndex
  })
  _controllers.forEach(controller => {
    const prefix = Reflect.getMetadata('Controller', controller)
    const $route = new Router()
    const uses = Reflect.getMetadata('Middleware', controller) || []
    const params = Reflect.getMetadata('Param', controller) || []
    params.forEach(param => $route.param(param.id, ...param.middlewares))
    const controllerProperties = Object.getOwnPropertyNames(controller.prototype)
    for (let i = 0; i < controllerProperties.length; i++) {
      const property = controllerProperties[i]
      if (property === 'constructor') continue
      const middlewares = Reflect.getOwnMetadata('Middleware', controller.prototype[property]) || []
      const Https = Reflect.getOwnMetadata('Http', controller.prototype[property])
      const decorateOptions = {}
      for (const decorate in decorates) {
        const _decorateResult = decorates[decorate].get(controller.prototype[property])
        if (_decorateResult !== undefined) {
          decorateOptions[decorate] = {
            value: _decorateResult,
            target: decorates[decorate]
          }
        }
      }
      if (Https) {
        Https.forEach(http => {
          const _middlewares = middlewares.slice(0)
          _middlewares.push(async (ctx, next) => {
            ctx.status = 440
            const _controller = wrapContext(ctx, new controller(ctx))
            const options = {}
            for (const option in decorateOptions) {
              const _target = decorateOptions[option].target
              const data = decorateOptions[option].value
              if (typeof _target.interfaceDidRendered === 'function') {
                _target.interfaceDidRendered(data, { options, ctx })
              }
            }
            const result = await _controller[property].call(_controller, options, next)
            if (isVnode(ctx, result)) {
              ctx.status = 200
              return await ctx.render(wrapVnodeComponent(result))
            }
            if (result !== undefined) ctx.body = result
          })
          $route[http.method.toLowerCase()](http.prefix, ..._middlewares)
        })
      }
    }
    app.$router.use(prefix, ...uses, $route.routes())
  })
}
