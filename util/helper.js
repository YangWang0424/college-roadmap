

exports.filterObject = function (item, excludedKey){
    let asArray = Object.entries(item);
    let filtered = asArray.filter(function ([key, value]) {return key !== excludedKey});
    return Object.fromEntries(filtered);
}



// check isLoggedIn
exports.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'you have to login first!')

    res.redirect("/");
}


// check isLoggedIn
exports.isAdmin = function (req, res, next){
    if(req.isAuthenticated()){
        if(req.user.username === "admin"){
            return next();
        }else{
            req.flash('error', 'you dont have permission to view this page!')
        }
    }
    req.flash('error', 'you have to login first')

    res.redirect("/");
}
