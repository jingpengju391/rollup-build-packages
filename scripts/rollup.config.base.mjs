import path from 'node:path'
import { fileURLToPath } from 'node:url'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import pkg from '../package.json' with { type: 'json' }

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { name, version, author, dependencies, peerDependencies } = pkg
const externalPackages = Object.keys({ ...dependencies, ...peerDependencies })
const external = (id) => !id.endsWith('.css') && externalPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`))
const banner = `/*! ${name} v${version} | (c) ${new Date().getFullYear()} ${author} | MIT */`

export default {
  input: path.join(root, 'packages/index.ts'),
  external,
  output: [
    {
      dir: path.join(root, 'dist/es'),
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: path.join(root, 'packages'),
      entryFileNames: '[name].mjs',
      sourcemap: true,
      banner,
    },
    {
      dir: path.join(root, 'dist/lib'),
      format: 'cjs',
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: path.join(root, 'packages'),
      entryFileNames: '[name].cjs',
      sourcemap: true,
      banner,
    },
  ],
  plugins: [
    alias({ entries: [{ find: '@', replacement: path.join(root, 'packages') }] }),
    replace({ preventAssignment: true, values: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production') } }),
    nodeResolve({ extensions: ['.mjs', '.js', '.json', '.ts'] }),
    commonjs(),
    postcss({ extensions: ['.css', '.scss', '.sass'], extract: 'style.css', minimize: false, config: false, use: ['sass'] }),
    typescript({ tsconfig: path.join(root, 'tsconfig.rollup.json') }),
  ],
}
