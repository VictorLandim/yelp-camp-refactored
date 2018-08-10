require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { indexRoutes, restaurantRoutes, commentRoutes, authRoutes, seedRoutes } = require('./routes');
const User = require('./models/user');
const { errorMiddleware } = require('./middleware');
const { mongoUrl } = require('./config');

mongoose.connect(
    mongoUrl,
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
    expressSession({
        secret: 'Extremely secret key',
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

app.use(methodOverride('_method'));
app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.message = {
        success: req.flash('success'),
        error: req.flash('error'),
        info: req.flash('info')
    };
    res.locals.moment = require('moment');
    res.locals.path = req.path;
    next();
});

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/restaurants/:id/comments', commentRoutes);
app.use('/seed', seedRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
// app.use(errorMiddleware);

module.exports = app;
