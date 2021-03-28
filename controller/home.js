exports.homeController = (req,res,next) => {
    res.render('home', {
        pageTitle : 'Home',
        path : '/'
    });
}