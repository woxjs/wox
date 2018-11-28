export default {
  name: 'WoxPage',
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