var path = require('path')

var config = {
  getProjectRoots () {
    return [
      path.resolve(__dirname),
      path.resolve(__dirname, '../') // allows us to access the library
    ]
  }
}

module.exports = config
