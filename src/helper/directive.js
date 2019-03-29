import Vue from 'vue'
/**
 *
 *
 * @class ApplicationAction
 */
class ApplicationAction {
  constructor (app, el, name) {
    this.app = app
    this.el = el
    this.name = name
    this.url = null
    this.sync = false
    this.handle = null
  }

  set (value, arg, modifiers = {}) {
    this.url = value
    this.sync = arg === 'sync' || modifiers.sync
  }

  bind (value, arg, modifiers) {
    this.handle = async () => {
      if (typeof this.app[this.name] === 'function') {
        await this.app[this.name](this.url, this.sync)
      }
    }
    this.el.addEventListener('click', this.handle)
    this.set(value, arg, modifiers)
  }

  unbind () {
    if (this.handle) this.el.removeEventListener('click', this.handle)
    if (this.el.__wox_directive_target__) {
      delete this.el.__wox_directive_target__
    }
  }
}
/**
 * inject vue directives to view model.
 *
 * @export
 * @param {wox} app
 */
export default function injectVueDirectives (app) {
  ['redirect', 'replace', 'reload'].forEach(name => {
    Vue.directive(name, {
      bind (el, binding) {
        const target = new ApplicationAction(app, el, name)
        target.bind(binding.value, binding.arg, binding.modifiers)
        el.__wox_directive_target__ = target
      },
      unbind (el) {
        if (el.__wox_directive_target__) {
          el.__wox_directive_target__.unbind()
        }
      },
      update (el, binding) {
        if (el.__wox_directive_target__) {
          el.__wox_directive_target__.set(
            binding.value,
            binding.arg,
            binding.modifiers
          )
        }
      },
      componentUpdated (el, binding) {
        if (el.__wox_directive_target__) {
          el.__wox_directive_target__.set(
            binding.value,
            binding.arg,
            binding.modifiers
          )
        }
      }
    })
  })
}
