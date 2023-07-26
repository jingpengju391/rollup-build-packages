import resolve, { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import eslint from '@rollup/plugin-eslint'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import json from '@rollup/plugin-json'
import { name, version, author } from '../package.json'
// import path from 'path'

const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * (c) 2022-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'

export default {
  input: 'packages/index.js',
  output: [
    {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
      banner,
      sourcemap: true,
      sourcemapPathTransform: (relativeSourcePath) => {
        if (relativeSourcePath.startsWith('types/')) {
          return `../types/esm/${relativeSourcePath}.map`
        } else {
          return relativeSourcePath + '.map'
        }
      },
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      banner,
      sourcemap: true,
      sourcemapPathTransform: (relativeSourcePath) => {
        if (relativeSourcePath.startsWith('types/')) {
          return `../types/cjs/${relativeSourcePath}.map`
        } else {
          return relativeSourcePath + '.map'
        }
      },
    },
    {
      dir: 'dist/umd',
      format: 'umd',
      banner,
      name: `${name}.${version}`,
    },
  ],
  plugins: [
    json(),
    clear({
      targets: ['dist'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
      preventAssignment: true,
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    eslint({
      throwOnError: true, // 抛出异常并阻止打包
      include: ['packages/**'],
      exclude: ['node_modules/**'],
    }),
    babel({ babelHelpers: 'bundled' }),
    resolve({ extensions: ['.js', '.ts'] }),
    terser(),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
  },
}
