const path = require('path')
const blacklist = require('metro-bundler/src/blacklist')
const escape = require('escape-string-regexp')

module.exports = {
  getProjectRoots () {
    return [__dirname, path.resolve(__dirname, '..')]
  },
  getProvidesModuleNodeModules () {
    return ['react-native', 'react']
  },
  getBlacklistRE () {
    return blacklist([
      new RegExp(
        `^${escape(path.resolve(__dirname, '..', 'node_modules'))}\\/.*$`
      )
    ])
  }
}
