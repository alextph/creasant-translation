var express = require('express');
var path = require('path');
var log4js = require('log4js');
var _ = require('lodash');
var pkg = require('./package.json')
var fs = require('fs-extra');
var ApiManager = require('./ApiManager');

// standard log method using log4js
var logger = log4js.getLogger();
logger.level = 'debug';

var configFile = path.join(__dirname, "config.json")
var connConfig = {
  host: "",
  user: "",
  password: "",
  database: ''
}

if (fs.existsSync(configFile)){
  connConfig = _.extend(connConfig, fs.readJsonSync(configFile));
} else {
  logger.warn(`config file ${configFile} not exists, a default config file is generated`);
  fs.writeJsonSync(configFile, connConfig, {spaces:2});
}

let app = express();
app.use(new ApiManager(connConfig).app);
app.use(express.static(path.join(__dirname, "src")));
let server = app.listen(pkg.config.port, ()=> {
  logger.info(`${pkg.name} started at http://localhost:${server.address().port}`)
});