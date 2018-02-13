const passport = require('passport');
const passportSetup = require('./../config/passport.setup');




module.exports = function (app) {
    passportSetup(passport);

    app.get('/auth/login/google',
        passport.authenticate('google', {
            scope:
                ['https://www.googleapis.com/auth/youtube', 
                'https://www.googleapis.com/auth/youtube.readonly']
        }
        ));

    app.get('/auth/callback/google',
        passport.authenticate('google', {
            successRedirect: '/auth/callback/success/google',
            failureRedirect: '/auth/callback/failure/google'
        }));

    app.get('/auth/callback/success/google', (req, res)=>{
        console.log('google callback success');
    });

    app.get('/auth/callback/failure/google', (req, res)=>{
        console.log('google callback success');
    })

}