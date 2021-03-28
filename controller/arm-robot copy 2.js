exports.robot = (req,res,next) => {
    res.render('onestand', {
        pageTitle : 'onestand',
        path: '/onestand'
    })
}