var express = require('express')
    ,path = require('path')
    ,cookieParser = require('cookie-parser')
    ,bodyParser = require('body-parser')
    ,session = require('express-session')
    ,expressSanitizer = require('express-sanitizer')
    ,routes = require('./routes/index')
    ,api = require('./routes/api')
;
var db = require('./db');
var KnexSessionStore = require('connect-session-knex')(session);
var store = new KnexSessionStore({
    knex: db
});
var compress = require('compression');

var app = express();
app.disable('x-powered-by');
app.use(compress());

// view engine setup
var swig = require('swig');
// This is where all the magic happens!
app.engine('swig', swig.renderFile);

app.set('view engine', 'swig');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', false);
swig.setDefaults({ cache: false });

// uncomment after placing your favicon in /public

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(cookieParser('secretnah'));
app.use(session({
    cookie: { maxAge: 6 * 60 * 60 * 1000 },//6 hrs
    secret:'sekretneeee',
    resave:true,
    saveUninitialized:false,
    store: store
}));
if (app.get('env') === 'development') {
    app.use(require('node-sass-middleware')({
        debug: true,
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        sourceMap: true
    }));
}
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
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
