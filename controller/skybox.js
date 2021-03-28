exports.skybox = (req,res,next) => {
    res.render('skybox', {
        pageTitle : 'skybox',
        path: '/skybox'
    })
}