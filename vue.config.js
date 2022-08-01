const path = require('path')
module.exports = {
  runtimeCompiler: false,
  lintOnSave: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.resolve(__dirname, './src/theme/style.less')
      ]
    }
  }
}
