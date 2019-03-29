import Vue from 'vue'
export const wrapContext = (ctx, target) => {
  if (!target.ctx) {
    Object.defineProperty(target, 'ctx', {
      get: () => ctx
    })
  }

  if (!target.$createElement) {
    Object.defineProperty(target, '$createElement', {
      get: () => ctx.app.$vue.$createElement
    })
  }
  return target
}

export const isVnode = (ctx, result) => {
  return result && result.context === ctx.app.$vue
}

export const wrapVnodeComponent = (vnode) => {
  return Vue.extend({
    render: () => vnode,
    enter (ctx) {
      if (this.$children && this.$children.length) {
        this.$children.forEach(children => {
          if (typeof children.$options.enter === 'function') {
            children.$options.enter.call(children, ctx)
          }
        })
      }
    },
    leave (ctx) {
      if (this.$children && this.$children.length) {
        this.$children.forEach(children => {
          if (typeof children.$options.leave === 'function') {
            children.$options.leave.call(children, ctx)
          }
        })
      }
    }
  })
}
