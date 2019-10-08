var path = require('path')
var babel = require('rollup-plugin-babel')
var { terser } = require('rollup-plugin-terser')

var pkgName = process.env.PKG_NAME || require('../package.json').name
var version = process.env.VERSION || require('../package.json').version

var banner = '/**\n' + ` * ${pkgName} v${version} \n` + ' */\n'

export default {
  input: path.resolve(__dirname, '..', `src/${pkgName}.js`),

  output: {
    banner,
    sourcemap: true,
    format: 'umd',
    globals: {
      'vue-router': 'VueRouter'
    },
    name: pkgName
      .split('-')
      .map(i => i[0].toUpperCase() + i.slice(1))
      .join(''),
    file: path.resolve(__dirname, `../dist/${pkgName}.js`)
  },
  plugins: [
    babel(),
    terser({
      output: {
        comments: (node, comment) => {
          return comment.type === 'comment2'
        }
      }
    })
  ]
}
