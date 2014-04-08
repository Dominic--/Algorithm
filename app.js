/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret : '1234567890QWERT'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public/')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(8000, function(){
	console.log('Algorithm Start Working ... ');
});

