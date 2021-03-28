exports.pameran = (req,res,next) => {
    res.render('pameran', {
        pageTitle : 'pameran',
        path: '/pameran'
    })
}