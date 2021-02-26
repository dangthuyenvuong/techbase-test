import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import mongoose, { mongo } from 'mongoose'
import config from './config/database'
import logging from './config/logging'


var app = express();
const NAMESPACE = 'Server';


/**Connect to database mongodb */
mongoose.connect(config.mongo.url, config.mongo.options)
  .then(result => {
    logging.info(NAMESPACE, 'Connected to mongoDB!')
  })
  .catch(error => {
    logging.error(NAMESPACE, error.message, error)
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/user', require('./routes/user'));
app.use('/team', require('./routes/team'));
app.use('/department', require('./routes/department'));
app.use('/', require('./routes/admin'));
app.use('/mockup', require('./routes/mockup'));

// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: any) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
