const express = require('express');
const router = express.Router();
const passport = require('passport');
//rutas get

router.get('/signup', (req, res) => {
    res.render('signup')
});
router.get('/profile',isAuthenticate, (req, res) => {
    res.render('profile');
})

router.get('/signin', (req, res) => {
    res.render('signin');
})
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
})

//rutas post
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

function isAuthenticate (req,res,next)  {
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/signin');
}
module.exports = router;