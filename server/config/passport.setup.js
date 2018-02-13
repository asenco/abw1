var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
GoogleStrategy.prototype.userProfile = function(token, done) {
    done(null, {})
  };

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID:     '943463061593-db81e3bqkgraf405rusgrfuaaggls706.apps.googleusercontent.com',
        clientSecret: 'dUTVZXwhTiGX6rFjah-BHhjl',
        callbackURL: "http://localhost:3000/auth/callback/google",
        passReqToCallback   : true
      },
      function(request, accessToken, refreshToken, profile, done) {
        /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return done(err, user);
        }); */
        console.log('inside passport google callback, accessToken, refreshToken, profile:', accessToken, refreshToken, profile);
        return done({
            accessToken: accessToken
        });
      }
    ));
}