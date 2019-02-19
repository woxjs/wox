import Vue from 'vue';
class ApplicationAction {
  constructor(app, el, name) {
    this.app = app;
    this.el = el;
    this.name = name;
    this.url = null;
    this.sync = false;
    this.handle = null;
  }

  set(value, arg) {
    this.url = value;
    this.sync = arg === 'sync';
  }

  bind(value, arg) {
    this.handle = async () => {
      if (typeof this.app[this.name] === 'function') {
        await this.app[this.name](this.url, this.sync);
      }
    }
    this.el.addEventListener('click', this.handle);
    this.set(value, arg);
  }

  unbind() {
    if (this.handle) {
      el.removeEventListener('click', this.handle);
    }
    if (this.el.__wox_directive_taqrget__) {
      delete this.el.__wox_directive_taqrget__;
    }
  }
}
export default app => {
  ['redirect', 'replace', 'reload'].forEach(name => {
    Vue.directive(name, {
      bind(el, binding) {
        const target = new ApplicationAction(app, el, name);
        target.bind(binding.value, binding.arg);
        el.__wox_directive_taqrget__ = target;
      },
      unbind(el) {
        if (this.el.__wox_directive_taqrget__) {
          this.el.__wox_directive_taqrget__.unbind();
        }
      },
      update(el, binding) {
        if (el.__wox_directive_taqrget__) {
          el.__wox_directive_taqrget__.set(binding.value, binding.arg);
        }
      },
      componentUpdated(el, binding) {
        if (el.__wox_directive_taqrget__) {
          el.__wox_directive_taqrget__.set(binding.value, binding.arg);
        }
      }
    });
  })
}