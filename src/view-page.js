export default {
  name: 'WoxViewPage',
  computed: {
    webview() {
      return this.$root.webview;
    },
    props() {
      return this.$root.props;
    }
  },
  created() {
    this.$root.$on('enter', ctx => {
      const dynamicRenderer = this.$refs.dynamicRenderer;
      if (dynamicRenderer) {
        if (typeof dynamicRenderer.$options.enter === 'function') {
          dynamicRenderer.$options.enter.call(dynamicRenderer, ctx);
        }
        this.$root._virtualModel = dynamicRenderer;
      }
    });
    this.$root.$on('leave', () => {
      const dynamicRenderer = this.$root._virtualModel;
      if (dynamicRenderer) {
        if (typeof dynamicRenderer.$options.leave === 'function') {
          dynamicRenderer.$options.leave.call(dynamicRenderer);
        }
      }
    });
  },
  render(h) {
    return h(this.webview, { 
      props: this.props,
      ref: 'dynamicRenderer'
    });
  }
}