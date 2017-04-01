const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const {ExtractJwt, Strategy} = passportJWT;

const api = require('./routes/api')
const index = require('./routes/index');
// const users = require('./routes/users');

const app = express();

const users = [
  {
    id: 1,
    name: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: 2,
    name: 'test',
    password: 'test'
  }
];

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // The secretOrKey is the secret that our tokens will be signed with. Choose this wisely or use a private key.
  secretOrKey: 'iLoveSteve'
}

// jwt_payload is the data decrypted from the jwt token, which is part of the request (it's going to be in the header)
// this strategy is used to find the user
const strategy = new Strategy(jwtOptions, ((jwt_payload, next) => {
  console.log('payload received', jwt_payload);
  const user = users.find(({id}) => jwt_payload.id === id);
  user ? next(null, user) : next(null, false);
}));
passport.use(strategy);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
