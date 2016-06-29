//app.js reads from this file
////for mongodb connection details.
////and env details. Env can be set in environment variable also. first preference is given to config file.
var config = {}
//// config.env = "dev" // after setting env set appropriate mongoDB details below.
//config.env = "prod" // after setting env set appropriate mongoDB details below.
//

config.env = "dev" // after setting env set appropriate mongoDB details below.


config.dev = {};
config.dev.mongo = {};
config.dev.mongo.username = "";
config.dev.mongo.password = "";
config.dev.mongo.host = "localhost";
config.dev.mongo.db = "bizthrive";

config.prod = {};
config.prod.mongo = {};
config.prod.mongo.username = "";
config.prod.mongo.password = "";
config.prod.mongo.host = "10.144.71.31";
config.prod.mongo.db = "infrabotDB";

config.test = {};
config.test.mongo = {};
config.test.mongo.username = "";
config.test.mongo.password = "";
config.test.mongo.host = "";
config.test.mongo.db = "";

module.exports = config;
