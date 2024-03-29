const isAuth = (req, res,next) => {
    // if(req.session.isAuth){
    //     next();
    // }else{
    //     res.redirect('/login');
    // }

    console.log(`isAuth : ${req.session.userId}`);

    if(req.session.userId !== undefined){
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = isAuth;