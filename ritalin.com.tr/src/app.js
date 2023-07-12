var createError = require('http-errors')
var express = require('express')
var session = require('express-session')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var engine = require('ejs-locals')
// var errorHandler = require('errorhandler')
var logger = require('morgan')
var favicon = require('serve-favicon')
var methodOverride = require('method-override')
global.app = express()
var cors = require('cors')
app.use(cors())

app.use(favicon(path.join(__dirname, 'assets/img/web-icon.png')))

app.engine('ejs', engine)
app.set('views', path.join(__dirname, 'pages'))
app.set('view engine', 'ejs')


app.use(logger('dev'))

app.use(bodyParser.json({ limit: "500mb" }))
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 50000 }))


app.use(cookieParser())

app.set('trust proxy', 1)
app.use(session({
	secret: 'hello world',
	resave: false,
	saveUninitialized: true,
	name: app.get('name'),
	cookie: { path: '/', httpOnly: false, secure: false, maxAge: null }
}))
app.use('/assets',express.static(path.join(__dirname, 'assets')))

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

app.use('/', indexRouter)
app.use('/users', usersRouter)


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404))
// })

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
