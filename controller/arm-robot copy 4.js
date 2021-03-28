exports.robot = (req,res,next) => {
    res.render('ground', {
        pageTitle : 'ground',
        path: '/ground'
    })
}