const isAuth = (req, res,next) => {
    // if(req.session.isAuth){
    //     next();
    // }else{
    //     res.redirect('/login');
    // }
    if( req.session.userId!==null){
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = isAuth;