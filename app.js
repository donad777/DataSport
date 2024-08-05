var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cateRouter = require('./routes/CateloryRouter');
var productRouter = require('./routes/ProductRouter');
var newRouter = require('./routes/NewRouter');
var app = express();


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-config');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


var edit = express();

// Đăng ký helper eq
exphbs.registerHelper('eq', function (a, b) {
  return a === b;
});

// Cấu hình view engine
app.set('view engine', 'hbs');

// Đăng ký helper string
exphbs.registerHelper('string', function (value) {
  return String(value);
});

//config mongoose
const mongoose = require('mongoose');
require('./model/category')
require('./model/product')
require('./model/user')
require('./model/new1')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Định nghĩa tuyến đường cho trang login
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

// Chuyển hướng từ URL gốc đến trang login
app.get('/login', (req, res) => {
  res.redirect('/login');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category-add', cateRouter)
app.use('/products', productRouter)
app.use('/news', newRouter)

//connect database
mongoose.connect('mongodb+srv://nguyenanhdiendo:diendo1707@cluster0.pyzfljp.mongodb.net/DataSport', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
