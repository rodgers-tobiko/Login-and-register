// When a user is not logged in
function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    next();
}

// When a user is logged in
function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){  //req.isAuthenticated means the user is logged in
        return next();
    }
    res.redirect("/login");
};

module.exports = {checkAuthenticated,checkNotAuthenticated}