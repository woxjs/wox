import Vue from 'vue';
export const wrapContext = (ctx, target) => {
  if (!target.ctx) {
    Object.defineProperty(target, 'ctx', {
      get: () => ctx
    });
  }

  if (!target.$createElement) {
    Object.defineProperty(target, '$createElement', {
      get: () => ctx.app.$vue.$createElement
    });
  }
  return target;
}

export const isVnode = (ctx, result) => {
  return result && result.context === ctx.app.$vue;
}

export const wrapVnodeComponent = (vnode) => {
  return Vue.extend({
    enter(ctx) {
      const dynamicRenderer = this.$refs.dynamicVnodeRenderer;
      if (dynamicRenderer) {
        if (typeof dynamicRenderer.$options.enter === 'function') {
          dynamicRenderer.$options.enter.call(dynamicRenderer, ctx);
        }
      }
    },
    leave(ctx) {
      const dynamicRenderer = this.$refs.dynamicVnodeRenderer;
      if (dynamicRenderer) {
        if (typeof dynamicRenderer.$options.leave === 'function') {
          dynamicRenderer.$options.leave.call(dynamicRenderer, ctx);
        }
      }
    },
    render(h) {
      return h(vnode, {
        ref: 'dynamicVnodeRenderer'
      });
    }
  })
}
