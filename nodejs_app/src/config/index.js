// build configuration
//IMP: .env is picked from CWD, when start the app, so we might need to
// start app from root folder only when .env is available
require('dotenv').config({ debug: process.env.DEBUG });

const getConfig = require('./config');

module.exports = getConfig;
