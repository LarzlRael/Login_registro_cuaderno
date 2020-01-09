//importanciones de los modulos
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const engine = require('ejs-mate');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('./passport/local_auth')
//settings
app.set('port', process.env.PORT || 3000);
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
require('./database')



//middelwares
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'mySecretSession',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//

app.use((req, res, next) => {
    app.locals.signUpMessage = req.flash('signUpMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
})
//rutas
app.use(require('./routes/index'));




//haciendo correr el servidor
app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
});