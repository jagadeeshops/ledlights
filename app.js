var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

global.__basedir = __dirname + '/';
rootdir=__dirname; // Important setting which shares the apps root directory to all the files.Based on this setting all other files are called and used.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var mongoose = require('mongoose');

var config = require('./config');

var env = config.env;


var options = {
  server: { poolSize: 50 },
}

if (env) {
    env = env.toLowerCase();
    console.log("Found " + env + " as Environment from Host and trying to connect to the appropriate DB" );
    if ( env ) {
      if ( config[env] && config[env].mongo && config[env].mongo.host && config[env].mongo.db ) {
        if ( config[env].mongo.username && config[env].mongo.password ) {
          mongoose.connect('mongodb://' + config[env].mongo.username + ':' + config[env].mongo.password+ '@' + config[env].mongo.host  + '/' + config[env].mongo.db , options);
          console.log("Connecting to the host " + config[env].mongo.host + " with username " + config[env].mongo.username + " to the db " + config[env].mongo.db );
        } 
        else {
          mongoose.connect('mongodb://' + config[env].mongo.host  + '/' + config[env].mongo.db , options);
          console.log("Connecting to the host " + config[env].mongo.host + " without any username to the db " + config[env].mongo.db );
        }
      }
      else {
        console.error(Date() + "  Warn: Environment (env) is set as " + env );
        console.error(Date() + "  Error: Appropriate config details are not set in the config.js file for the given ENV " + env );
        process.exit(103);
      }  
    }    
    else {
        console.error(Date() + "  Error: Environment (env) is set with " + env + ".Expecting env value to be dev or prod.Based on the given value app will connect to diferent databases.");
        process.exit(102);
    }
}
else {
    console.error(Date() + "  Error: Environment (env) is NOT set in config file ( config.js ). Expecting ENV value to be dev or prod.Based on the given value app will connect to diferent databases.")
    process.exit(101);
}



var db = mongoose.connection;
db.on('error', function callback () {
  console.error( Date() + "Error connecting with Database : EXITING" );
  process.exit(100);
});
db.once('open', function callback () {
  console.log("Connected to Database" );
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
