export default (app, Vue) => {
  ['redirect', 'replace', 'reload'].forEach(name => {
    Vue.directive(name, {
      bind(el, binding) {
        if (el.__click_Callback__) el.removeEventListener('click', el.__click_Callback__);
        el.__click_Callback__ = () => {
          const url = el.url;
          switch (name) {
            case 'reload': app.reload && app.reload(); break;
            default: app[name](url);
          }
        };
        el.addEventListener('click', el.__click_Callback__);
        el.url = binding.value;
      },
      unbind(el) {
        if (el.__click_Callback__) el.removeEventListener('click', el.__click_Callback__);
        if (el.url) delete el.url;
      },
      update(el, binding) {
        el.url = binding.value;
      },
      componentUpdated(el, binding) {
        el.url = binding.value;
      }
    });
  })
}