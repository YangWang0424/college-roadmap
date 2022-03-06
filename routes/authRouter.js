var express = require('express');
var router = express.Router();
const User = require("../models/user");
var passport = require('passport');
var helper = require("../util/helper")


/* GET users login. */
router.get('/login',  function(req, res, next) {
    res.render('login', {error:req.flash('error'), success:req.flash('success') });
});


router.post('/login', function (req, res) {
    passport.authenticate('local', function(err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/auth/login');
        }
        if (!user) {
            req.flash('error', 'not such user!')
            return res.redirect('/auth/login');
        }

        req.login(user, function(err){
            if (err) {
                req.flash('error', err);
                return res.redirect('/auth/login');
            }
            req.flash('success', 'login success!')
            res.redirect('/');
        });
    })(req, res)
});

// Logout
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

router.get("/secret", helper.isLoggedIn, function(req, res){
    res.render("secret");
});


/* GET users listing. */
router.get('/signup', function(req, res, next) {
    res.render('signup');
});


router.post('/signup', function(req, res, next) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let repeatPassword = req.body.repeatPassword;

    console.log(req.body);

    if (password !== "" && repeatPassword !== "" && username !== "" && email !== ""){
        if (password !== repeatPassword){
            req.flash('error', 'password not match!')
            return res.render('signup', {error:req.flash('error')});
        }

    }else{
        req.flash('error', 'please fill all fields!')
        return res.render('signup', {error:req.flash('error')});
    }

    let newUser = new User({email: req.body.email, username: req.body.username});

    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash('error', err)
            return res.render('signup', {error:req.flash('error')});
        }

        req.flash('success', 'Your account has been saved!')
        return res.redirect('/auth/login');
    });
});


module.exports = router;
