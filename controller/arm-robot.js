exports.robot = (req,res,next) => {
    res.render('arm-robot', {
        pageTitle : 'Arm Robot',
        path: '/arm-robot'
    })
}