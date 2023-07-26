import baseConfig from './rollup.config.base'
import filesize from 'rollup-plugin-filesize'
import postBuild from './post.build'

export default {
  ...baseConfig,
  plugins: [...baseConfig.plugins, ...postBuild.plugins, filesize()],
}
