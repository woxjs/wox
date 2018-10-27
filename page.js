export default {
  name: 'WoxPage',
  render(h) {
    return h(this.$root.webview, { props: this.$root.props });
  }
}