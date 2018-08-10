const passport = require('passport');
const User = require('../models/user');

module.exports.showLogin = (req, res) => res.render('auth/login');
module.exports.showRegister = (req, res) => res.render('auth/register');

module.exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            req.flash('error', err.message + '. 😕');
            return res.redirect('back');
        }

        if (info) {
            req.flash('error', info.message + '. 😕');
            return res.redirect('back');
        }

        if (!user) {
            return res.redirect('back');
        }
        req.logIn(user, err => {
            if (err) {
                req.flash('error', err.message + '. 😕');
                return res.redirect('back');
            }

            req.flash('success', 'Logged in as ' + user.username + '. 😃');
            return res.redirect('/restaurants');
        });
    })(req, res, next);
};

module.exports.register = (req, res) => {
    const { name, username, password } = req.body;

    User.register(new User({ name, username }), password, (err, user) => {
        if (err) {
            req.flash('error', err.message + '. 😕');
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('success', 'Welcome, ' + name.split(' ')[0] + '. 🙂');
            res.redirect('/restaurants');
        });
    });
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('info', 'Logged you out. Goodbye. 🙂');
    res.redirect('/restaurants');
};
