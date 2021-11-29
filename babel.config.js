module.exports = {
  "plugins": [
    ['import', {
      "libraryName": 'vant',
      "libraryDirectory": 'es',
      'style':'@/assets/style.less',
    }, 'vant']
  ],
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}