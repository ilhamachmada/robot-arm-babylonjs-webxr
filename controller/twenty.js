exports.twenty = (req,res,next) => {
    res.render('twenty', {
        pageTitle : 'twenty',
        path: '/twenty'
    })
}