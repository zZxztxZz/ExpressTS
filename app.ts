import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import booksRouter from './routes/book';
import recordRouter from './routes/record'

import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

var app = express();

//配置 swagger-jsdoc
const options ={
  definition:{
    openapi:'3.0.0',
    info:{
      title:'图书管理系统ExpressTS',
      version:'1.0.0'
    }
  },
  apis:[ path.join(__dirname,'/routes/*.ts')]
}

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json',function(req,res){
  res.setHeader('Content-Type','application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books',booksRouter);
app.use('/records',recordRouter);

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
} as express.ErrorRequestHandler);

export default app;
