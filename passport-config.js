const localStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');

// Initialize passport
function initalize(passport, getUserByEmail, getUserById) {
    // authenticate user
    const authenticateUser = async (email,password, done)=>{
    // Get user by email
    const user = getUserByEmail(email);
    if(user== null) {
        return done(null,false, {message: "No user found with that email"});
    }
    try{
        if(await bcrypt.compare(password, user.password)){
            return done(null, user);
        } else {
            return done(null, false, {message: "Password Incorrect!"})
        }
    } catch(e) {
        return done(e);
        console.log(e);
    }
    }
    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done)=>done(null,user.id));
    passport.deserializeUser((id, done)=>{
        return done(null, getUserById(id))
    });
}

module.exports = initalize;


































// const localStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcrypt");

// function initalize(passport) {
//     // authenticate user
//     const authenticateUser = async (email, password, done)=>{
//         // Get user by email
//         const user = getUserByEmail(email);
//         if(user == null) {
//             return done(null, false, {message: "No user found by that email"})
//         }
//         try{
//             if(await bcrypt.compare(password, user.password)){
//                 return done(null, user);
//             }
//         } catch(e) {
//             console.log(e);
//             return done(e);
//         }
//     }

//     passport.use(new localStrategy({usernameField: 'email'}));
//     passport.serialize((user, done)=>{})
//     passport.deserialize((id, done)=>{})
// } 

// module.exports = initalize;