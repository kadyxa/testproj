const JsonStrategy  = require('passport-json').Strategy;
const db = require('../db');

module.exports = function ( passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        db.user.findById(user).then(res => {
            done(null, {user: res.name, id: res.id, currency: res.currency, role: res.role});
        }).catch(err => {
            done(err);
        })
    });


    passport.use('json', new JsonStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
            allowEmptyPasswords: false
        },
        function (req, username, password, done) {
            let dataIn = {
                username: username,
                password: password
            }
            db.user.getAuth(dataIn).then(res => {
                if (username === res.name && password === res.password) {
                    return done(null, {user: res.name, id: res.id, currency: res.currency, role: res.role});
                } else {
                    return done(null, false, {message: 'Incorrect username.'});
                }
            }).catch(err => {
                return done(null, false, {message: 'Incorrect username.'});
            })
        }
    ));
}