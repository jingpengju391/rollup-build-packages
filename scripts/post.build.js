import copy from 'rollup-plugin-copy'
import defaultConfig from './defaultConfig/package.json'
import unpkg from './defaultConfig/unpkg.json'
export default {
  plugins: [
    copy({
      targets: [
        {
          src: 'package.json',
          dest: 'dist',
          transform: (contents) => {
            const pkg = { ...JSON.parse(contents.toString()), ...defaultConfig }
            Object.keys(pkg.dependencies).forEach((key) => {
              if (!unpkg[key]) {
                pkg.peerDependencies[key] = pkg.dependencies[key]
              }
            })

            delete pkg.scripts
            delete pkg.devDependencies
            delete pkg.dependencies
            delete pkg.jest
            return JSON.stringify(pkg, null, 2)
          },
        },
        { src: 'README.md', dest: 'dist' },
      ],
    }),
  ],
}
