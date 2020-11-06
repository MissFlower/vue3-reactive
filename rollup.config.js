import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/umd/bundle.js',
    format: 'umd',
    name: 'Vue3-reactive',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    // 热更新 默认监听根文件夹
    livereload(),
    serve({
      open: true,
      port: 9527,
      contentBase: '',
      openPage: '/index.html'
    }),
    commonjs()
  ]
}