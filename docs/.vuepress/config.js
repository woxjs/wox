module.exports = {
  title: 'WoX',
  description: 'A dynamic loader MVC architecture based on Vue.js development which use web virtual service and web virtual request mode.',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    displayAllHeaders: true,
    repo: 'woxjs/wox',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '帮助我们改善此页面！',
    nav: [
      { text: '简介', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: '脚手架', link: '/cli/' },
      { text: '核心插件', link: '/plugins/' },
    ],
    sidebar: {
      '/guide/': [
        '',
        'install',
        'usage',
        'virtual'
      ],
      '/api/': [
        ''
      ],
      '/cli/': [
        '',
        'factory',
        'wox'
      ],
      '/plugins/': [
        '',
        'vuex'
      ]
    }
  }
}