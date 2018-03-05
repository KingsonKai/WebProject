var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');
var ejs = require('ejs');
var index = require('./routes/index');

global.db = mongoose.connect("mongodb://localhost:27017/signin");
global.getmodel = require('./database/model');

var app = express();

app.use(session({
	resave: false,
	saveUninitialized:true,
	secret: 'secret',
	cookie:{ 
		maxAge: 1000*60*30
	}
}));
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
	res.locals.user = req.session.user;
	var error = req.session.error;
	delete req.session.error;
	res.locals.message = "";
	if(error){
		res.locals.message = '<div class="alert" style="margin-bottom:10px;color:red;">'+error+'</div>';
	}
	next();
});

app.use('/', index);
app.use('/regist', index);
app.use('/login', index);
app.use('/logout', index);
app.use('/details', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
