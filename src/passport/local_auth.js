const passport = require('passport');
const User = require('../models/user');
const localStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id)
});
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})
passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const User_duplicate = await User.findOne({ email: email });
    if (User_duplicate) {
        return done(null, false, req.flash('signUpMessage', 'El email esta siendo usado por otro usuario'));
    } else {
        const NewUser = new User();
        NewUser.email = email;
        NewUser.password = NewUser.encriptarContraseña(password);
        await NewUser.save();
        done(null, NewUser);
    }

}))
passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'Usuario no Encontrado'))
    }
    if (!user.compararContraseña(password)) {
        return done(null, false, req.flash('signinMessage', 'Contreña Incorrecta'));
    }
    return done(null,user);


}))