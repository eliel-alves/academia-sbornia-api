var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
require('./auth')(passport);

function authenticationMiddleware(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/login');
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configurando express com sessao e com o passport
app.use(session({
  secret: '123',
  resave: false, // se a cada requisicao preciso salvar ou nao a sessao
  saveUnitialized: false, // se devo salvar sessoes anonimas
  cookie: { maxAge: 1 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

// rotas
app.use('/login', loginRouter);
app.use('/api', authenticationMiddleware, apiRouter);
app.use('/users', authenticationMiddleware, usersRouter);
app.use('/', authenticationMiddleware, indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
