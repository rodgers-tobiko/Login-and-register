// Installing libraries that we installed using npm
const express = require('express');
const router = express.Router();
const passport = require('passport');
const initializePassport = require('../passport-config');
const bcrypt = require('bcrypt'); //Importing bcrypt package
const session = require('express-session');
const {checkNotAuthenticated, checkAuthenticated} = require('../middlewares');
const methodOverride = require('method-override');

// User data
const users = []


router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride("_method"));


initializePassport(
    passport,
    email=> users.find(user=>user.email===email),
    id => users.find(user=>user.id===id)
    );

// Home page
router.get('/', checkAuthenticated, (req, res)=>{
    res.render("index.ejs",{
        login: "Home Page",
        name: req.user.name
    });
});

//  Login page
router.get('/login', checkNotAuthenticated, (req, res)=>{
    res.render("login", {
        login:"Login Page",
        page:"Login Page"
    });
});

// Registration Page
router.get('/register', checkNotAuthenticated, (req, res)=>{
    res.render("register", {
        title:"Registration Page",
        page: "Registration Page"
    });
});

// POSTS
// Configuring the login
router.post('/login', checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));
// Configuring the register post functionality
router.post('/register', checkNotAuthenticated, async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        console.log(users); // Display newly registered users in the console

        res.redirect('/login');
    } catch(err) {
        console.log(err)
        res.redirect('/register');
    }
});

// Logout
router.delete("/logout", (req,res)=>{
    req.logout(req.user, err=>{
        if(err) return next(err);
    });
    res.redirect('/');
})
// End of routes


module.exports = router;

