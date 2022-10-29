/**
 * @return {object}
 */
const path = require('path');

function GenericConfig() {
  let rootPath = path.dirname(__dirname + '../');
  return {
    env: 'local',
    port: process.env.NODE_PORT || 2124,
    host: process.env.NODE_HOST || 'localhost',

    rootFolder: rootPath, //source folder path
    logFolder: rootPath, //'/var/log/',

    //TODO: populate paths, proper terminology
    paths: {
      config: __dirname,
    },
  };
}

module.exports = GenericConfig;
